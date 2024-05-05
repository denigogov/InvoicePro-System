import useSWR, { mutate } from "swr";
import "../../../Styling/Pages/_invoiceDetails.scss";
import { deleteInvoice, fetchSingleInvoiceById } from "../../../api/invoiceAPI";
import InvoiceDetailsBuyer from "../../../components/InvoicesComponents/invoiceDetails/InvoiceDetailsBuyer";
import InvoiceDetailsDescription from "../../../components/InvoicesComponents/invoiceDetails/InvoiceDetailsDescription";
import { useAuth } from "../../../helpers/useAuth";
import { SingleInvoiceByIdType } from "../../../types/invoiceTypes";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import moment from "moment";
import { confirmDeletePrompt } from "../../../components/GlobalComponents/deletePrompt";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";

const InvoiceDetails: React.FC = () => {
  const setPopupOpen =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  const { token } = useAuth();
  const { invoiceId } = useParams();
  const navigator = useNavigate();

  const {
    data: singleInvoiceData,
    error: singleInvoiceDataError,
    isLoading: singleInvoiceDataLoading,
  } = useSWR<SingleInvoiceByIdType>(
    ["singleInvoiceById", token, invoiceId],
    () => fetchSingleInvoiceById(token ?? "", invoiceId)
  );

  if (singleInvoiceDataError) return singleInvoiceDataError.error;
  if (singleInvoiceDataLoading) return <p>loading</p>;

  const invoiceData = singleInvoiceData?.findInvoice;
  const invoiceDescription = singleInvoiceData?.findDetails;
  const totalPrice = invoiceData?.[0]?.totalPrice;

  const deleteInvoiceRequest = async () => {
    const confirmDelete = confirmDeletePrompt(
      "Confirm deletion",
      `Do you want to proceed with deleting this invoice?`
    );
    try {
      if ((await confirmDelete).isConfirmed) {
        deleteInvoice(token ?? "", invoiceId ?? "");
        mutate(["allInvoicePagination", token]);
        navigator("/invoices/all");
        setPopupOpen((e) => !e);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  return (
    <div className="invoiceDetails">
      <div className="invoiceDetails__title">
        <div className="invoiceDetails__title-invoiceID">
          <h3>Invoice ID: {invoiceData?.[0]?.invoiceId}</h3>
        </div>
        <div className="invoiceDetails__title-invoiceDate">
          <p>
            created at:{" "}
            {moment(invoiceData?.[0]?.currentDate).format("Do MMMM YYYY")}
          </p>
          <p className="invoiceDetails__title-status">
            status: {invoiceData?.[0]?.statusName}
          </p>
        </div>
      </div>

      <div className="invoiceDetails__buyer">
        <InvoiceDetailsBuyer invoiceData={invoiceData} />
      </div>

      <div className="invoiceDetails__description">
        <InvoiceDetailsDescription
          invoiceDescription={invoiceDescription}
          totalPrice={totalPrice}
        />
      </div>

      <div className="invoiceDetails__actionButton">
        <h3>Action</h3>
        <div className="invoiceDetails__actionButton-wrap">
          <button onClick={deleteInvoiceRequest} className="button__delete">
            Delete Invoice
          </button>
          <button className="button__downloadPDF">Download as PDF</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
