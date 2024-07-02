import "../../../Styling/Pages/_invoiceDetails.scss";
import useSWR, { useSWRConfig } from "swr";
import {
  deleteInvoice,
  fetchSingleInvoiceById,
  updateInvoice,
} from "../../../api/invoiceAPI";
import InvoiceDetailsBuyer from "../../../components/InvoicesComponents/invoiceDetails/InvoiceDetailsBuyer";
import InvoiceDetailsDescription from "../../../components/InvoicesComponents/invoiceDetails/InvoiceDetailsDescription";
import { useAuth } from "../../../helpers/useAuth";
import {
  InvoicePaginationDataType,
  SingleInvoiceByIdType,
  invoiceDetails,
} from "../../../types/invoiceTypes";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import moment from "moment";
import { confirmDeletePrompt } from "../../../components/GlobalComponents/deletePrompt";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import LoadingRing from "../../../components/GlobalComponents/LoadingRing";
import ErrorMinimalDisplay from "../../../components/GlobalComponents/ErrorMinimalDisplay";
import { ContextTypeRouter } from "./AllInvoices";
import InvoicePDFGenerator from "../../../components/GlobalComponents/InvoicePDFGenerator";
import { calcTotalPrice } from "../../../helpers/taxCalc";
import { TaxDiscountValuesProps } from "../createInvoice/CreateInvoice";
import { useState } from "react";
import { successMessage } from "../../../components/GlobalComponents/successPrompt";
import { confirmUpdatePrompt } from "../../../components/GlobalComponents/updatePrompt";

const InvoiceDetails: React.FC = () => {
  const [setPopupOpen, pageIndex] = useOutletContext<ContextTypeRouter>();
  const [updateDetails, setUpdateDetails] = useState<boolean>(false);

  const { token } = useAuth();
  const { invoiceId } = useParams();
  const { mutate } = useSWRConfig();
  const navigator = useNavigate();

  const {
    data: singleInvoiceData,
    error: singleInvoiceDataError,
    isLoading: singleInvoiceDataLoading,
  } = useSWR<SingleInvoiceByIdType>(
    ["singleInvoiceById", token, invoiceId],
    () => fetchSingleInvoiceById(token ?? "", invoiceId)
  );

  const invoiceData = singleInvoiceData?.findInvoice;
  const invoiceDescription = singleInvoiceData?.findDetails;

  const totalPrice = invoiceDescription
    ?.map((a) => Number(a?.price) || 0)
    .reduce((acc, mov) => acc + mov, 0);

  // const totalPrice = invoiceData?.[0]?.totalPrice ?? 0;
  const taxValue = invoiceData?.[0]?.tax ?? 0;
  const discountValue = invoiceData?.[0]?.discount ?? 0;
  // const totalTax = taxDiscountCalculate(totalPrice ?? 0, +taxValue);

  const calcLogic = calcTotalPrice(totalPrice ?? 0, +discountValue, +taxValue);

  const totalDiscount = calcLogic?.totalDiscount;
  const totalTax = calcLogic.totalTax;

  const taxDiscountValues: TaxDiscountValuesProps = {
    taxValue: +taxValue,
    totalTax: totalTax,
    discountValue: +discountValue,
    totalDiscount: totalDiscount,
    totalPrice: Number(totalPrice) - Number(totalDiscount) + Number(totalTax),
  };

  const deleteInvoiceRequest = async () => {
    const confirmDelete = confirmDeletePrompt(
      "Confirm deletion",
      `Do you want to proceed with deleting this invoice?`
    );
    try {
      if ((await confirmDelete).isConfirmed) {
        deleteInvoice(token ?? "", invoiceId ?? "");

        mutate(
          ["allInvoicePagination", pageIndex, token],
          async (cachedData) => {
            const updatedData = cachedData.filter(
              (invoice: InvoicePaginationDataType) =>
                invoice.invoiceId !== invoiceId
            );
            return updatedData;
          }
        );

        navigator("/invoices/all");
        setPopupOpen((e) => !e);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  const handleUpdateDescription = async (
    query: invoiceDetails,
    id: number | null
  ) => {
    if (query?.description || query?.price) {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Please Confirm",
        "",
        "confirm"
      );

      if (query?.price) {
        const newPrice = Number(query?.price);
        const { totalPrice } = calcTotalPrice(
          newPrice,
          +discountValue,
          +taxValue
        );
        query.invoiceId = invoiceData?.[0]?.invoiceId;
        query.totalPrice = totalPrice;
      }

      try {
        if (confirmUpdateMessage.isConfirmed) {
          await updateInvoice<invoiceDetails>(
            id,
            token ?? "",
            "invoice/details",
            query
          );

          mutate(["singleInvoiceById", token, invoiceId]);
          successMessage("Invoice details success updated");
        }
      } catch (err) {
        apiGeneralErrorHandle(err);
      }
    }
  };

  if (invoiceId === "null")
    return (
      <ErrorMinimalDisplay errorMessage="Error: Invalid Invoice ID. Please ensure that the invoice ID is generated properly before submission." />
    );
  if (singleInvoiceDataError)
    return (
      <ErrorMinimalDisplay errorMessage={singleInvoiceDataError.message} />
    );

  if (singleInvoiceDataLoading) return <LoadingRing />;

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
          taxDiscountValues={taxDiscountValues}
          setUpdateDetails={setUpdateDetails}
          updateDetails={updateDetails}
          handleUpdateDescription={handleUpdateDescription}
        />
      </div>

      <div className="invoiceDetails__actionButton">
        <h3>Action</h3>
        <div className="invoiceDetails__actionButton-wrap">
          <button onClick={deleteInvoiceRequest} className="button__delete">
            Delete Invoice
          </button>
          {/* Button to download pdf document */}

          <InvoicePDFGenerator
            buyerData={invoiceData}
            invoiceDescription={invoiceDescription}
            taxDiscountValues={taxDiscountValues}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
