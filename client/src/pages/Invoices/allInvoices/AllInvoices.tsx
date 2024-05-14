import "../../../Styling/Components/InvoiceComponentStyle/_allInvoice.scss";
import useSWR from "swr";
import InvoiceTableNav from "../../../components/InvoicesComponents/allInvoices/InvoiceTableNav";
import InvoicesTable from "../../../components/InvoicesComponents/allInvoices/InvoicesTable";
import {
  AllInvoicesPaginationType,
  PaginationRequestType,
} from "../../../types/invoiceTypes";
import { useAuth } from "../../../helpers/useAuth";
import { fetchAllInvoicesPagination } from "../../../api/invoiceAPI";
import { Dispatch, SetStateAction, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export type ContextTypeRouter = [Dispatch<SetStateAction<boolean>>, number];
const VITE_PAGINATION_RESULTS_PRO_PAGE = import.meta.env
  .VITE_PAGINATION_RESULTS_PRO_PAGE as number;

const AllInvoices: React.FC = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [query, setQuery] = useState<PaginationRequestType>();

  const navigator = useNavigate();
  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/invoices/all");
  };

  // when user click on the table details button
  const openDetailsRoute = (invoiceId: string) => {
    setPopupOpen((x) => !x);
    navigator(`/invoices/all/details/${invoiceId}`);
  };
  const openEditRoute = (invoiceId: string) => {
    setPopupOpen((x) => !x);
    navigator(`/invoices/all/edit/${invoiceId}`);
  };

  const { token } = useAuth();

  const filterCookies = JSON.parse(
    decodeURIComponent(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)filterData\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    ) || "{}"
  );

  const {
    data: allInvoicePagination,
    error: allInvoicePaginationError,
    isLoading: allInvoicePaginationLoading,
  } = useSWR<AllInvoicesPaginationType[]>(
    [
      "allInvoicePagination",
      pageIndex,
      token,
      query === undefined ? filterCookies : query,
    ],
    () =>
      fetchAllInvoicesPagination(
        token ?? "",
        pageIndex,
        VITE_PAGINATION_RESULTS_PRO_PAGE,
        query === undefined ? filterCookies : query
      )
  );

  const handleNextPage = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const handleFilterSubmitBtn = (queryData: PaginationRequestType) => {
    setQuery(queryData);
  };

  return (
    <div className="allInvoices">
      <InvoiceTableNav handleFilterSubmitBtn={handleFilterSubmitBtn} />
      <InvoicesTable
        allInvoicePagination={allInvoicePagination}
        allInvoicePaginationError={allInvoicePaginationError}
        allInvoicePaginationLoading={allInvoicePaginationLoading}
        openDetailsRoute={openDetailsRoute}
        openEditRoute={openEditRoute}
      />
      <div className="allInvoices__button">
        {pageIndex > 1 && (
          <button onClick={() => handleNextPage(pageIndex - 1)}>
            Previous
          </button>
        )}

        <button onClick={() => handleNextPage(pageIndex + 1)}>Next</button>
      </div>

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp mdPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={[setPopupOpen, pageIndex]} />
          </main>
        </div>
      )}
    </div>
  );
};

export default AllInvoices;
