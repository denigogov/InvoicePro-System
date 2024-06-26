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
import TableNavPagination from "../../../components/InvoicesComponents/allInvoices/TableNavPagination";

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

  const sortCookies = JSON.parse(
    decodeURIComponent(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)sortData\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    ) || "{}"
  );

  const checkIsFilterEmpty =
    filterCookies === "" ||
    Object.values(filterCookies).every((value) => value === "");

  const {
    data: invoiceDataPagination,
    error: allInvoicePaginationError,
    isLoading: allInvoicePaginationLoading,
  } = useSWR<AllInvoicesPaginationType>(
    [
      "allInvoicePagination",
      pageIndex,
      token,
      query === undefined ? { ...sortCookies, ...filterCookies } : query,
    ],
    () =>
      fetchAllInvoicesPagination(
        token ?? "",
        pageIndex,
        VITE_PAGINATION_RESULTS_PRO_PAGE,
        query === undefined ? { ...sortCookies, ...filterCookies } : query
      )
  );

  const allInvoicePagination = invoiceDataPagination?.invoiceData ?? [];
  const paginationSettings = invoiceDataPagination?.pagination;

  const totalPagePagination = Array.from(
    { length: paginationSettings?.totalPages || 0 },
    (_, i) => i + 1
  );

  /**
   * Handle Pagination
   * @param newPageIndex number
   * ... Handle Next Page, Prev Page and the wish page number that user click  !
   */
  const handleNextPage = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const handleFilterSubmitBtn = (queryData: PaginationRequestType) => {
    setQuery(queryData);
  };

  const handleSort = (queryData: PaginationRequestType) => {
    setQuery({ ...query, ...queryData });
  };

  const handleSearchInvoice = (searchParam: string) => {
    const searchQuery = {
      searchInvoice: searchParam,
    };
    setQuery({ ...query, ...searchQuery });
  };

  return (
    <div className="allInvoices">
      <InvoiceTableNav
        handleFilterSubmitBtn={handleFilterSubmitBtn}
        checkIsFilterEmpty={checkIsFilterEmpty}
        handleSort={handleSort}
        handleSearchInvoice={handleSearchInvoice}
      />
      {/* Table */}
      <InvoicesTable
        allInvoicePagination={allInvoicePagination}
        allInvoicePaginationError={allInvoicePaginationError}
        allInvoicePaginationLoading={allInvoicePaginationLoading}
        openDetailsRoute={openDetailsRoute}
        openEditRoute={openEditRoute}
      />

      {/* Table Navigation page Numbers */}
      <TableNavPagination
        handleNextPage={handleNextPage}
        pageIndex={pageIndex}
        totalPagePagination={totalPagePagination}
        paginationSettings={paginationSettings}
      />

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
