import "../../../Styling/Components/InvoiceComponentStyle/_invoiceTableFilter.scss";
import useSWR from "swr";
import { fetchAllInvoiceStatus } from "../../../api/invoiceStatusAPI";
import { useAuth } from "../../../helpers/useAuth";

import ErrorMinimalDisplay from "../../GlobalComponents/ErrorMinimalDisplay";
import LoadingRing from "../../GlobalComponents/LoadingRing";
import { FetchAllInvoiceStatusTypes } from "../../../types/invoiceStatusTypes";
import { useRef } from "react";
import { PaginationRequestType } from "../../../types/invoiceTypes";
interface TableFilterProps {
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilterSubmitBtn: (query: PaginationRequestType) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
  setOpenFilter,
  handleFilterSubmitBtn,
}) => {
  const { token } = useAuth();

  const statusRef = useRef<HTMLSelectElement>(null);
  const priceMinRef = useRef<HTMLInputElement>(null);
  const priceMaxRef = useRef<HTMLInputElement>(null);
  const priceDateRef = useRef<HTMLInputElement>(null);

  const handleSubmitFilter = (e: React.FormEvent) => {
    e.preventDefault();

    const query = {
      statusId: statusRef?.current?.value.length
        ? statusRef?.current?.value
        : filterCookies?.statusRef ?? "",
      minPrice: priceMinRef?.current?.value.length
        ? priceMinRef?.current?.value
        : filterCookies?.priceMinRef,
      maxPrice: priceMaxRef?.current?.value.length
        ? priceMaxRef?.current?.value
        : filterCookies?.priceMaxRef,
      createdDate: priceDateRef?.current?.value.length
        ? priceDateRef?.current?.value
        : filterCookies?.priceDateRef,
    };
    document.cookie = `filterData=${encodeURIComponent(
      JSON.stringify(query)
    )}; max-age=${2 * 60 * 60}`;
    handleFilterSubmitBtn(query);
    setOpenFilter(false);
  };

  const filterCookies = JSON.parse(
    decodeURIComponent(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)filterData\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    ) || "{}"
  );

  const {
    data: invoiceAllStatus,
    error: invoiceAllStatusError,
    isLoading: invoiceAllStatusLoading,
  } = useSWR<FetchAllInvoiceStatusTypes[]>(["allInvoiceStatus", token], () =>
    fetchAllInvoiceStatus(token ?? "")
  );

  const filterStatus = invoiceAllStatus?.filter(
    (invoiceStatus) => invoiceStatus.id !== +filterCookies.statusId
  );

  const currentValue = invoiceAllStatus?.filter(
    (invoiceStatus) => invoiceStatus.id === +filterCookies.statusId
  );

  if (invoiceAllStatusError)
    return (
      <ErrorMinimalDisplay errorMessage={invoiceAllStatusError?.message} />
    );
  if (invoiceAllStatusLoading) return <LoadingRing />;

  return (
    <div className="tableFilter">
      <div className="tableFilter__status">
        <span>Status: </span>
        <select ref={statusRef}>
          {currentValue?.length && (
            <option value={currentValue?.[0]?.id}>
              {currentValue?.[0]?.statusName}
            </option>
          )}
          <option value="">All</option>
          {filterStatus?.map((status) => (
            <option key={status?.id} value={status?.id}>
              {status?.statusName ?? ""}
            </option>
          ))}
        </select>
      </div>
      <div className="tableFilter__price">
        <span>Price: </span>
        <input
          ref={priceMinRef}
          type="number"
          defaultValue={
            priceMinRef?.current?.value?.length
              ? priceMinRef?.current?.value
              : filterCookies?.minPrice ?? ""
          }
          step="0.1"
          min="0"
          placeholder="min"
        />{" "}
        -{" "}
        <input
          ref={priceMaxRef}
          defaultValue={
            priceMaxRef?.current?.value?.length
              ? priceMaxRef?.current?.value
              : filterCookies?.maxPrice ?? ""
          }
          type="number"
          step="0.1"
          min="0"
          placeholder="max"
        />
      </div>
      <div className="tableFilter__date">
        <span>Date: </span>
        <input
          defaultValue={
            priceDateRef?.current?.value?.length
              ? priceDateRef?.current?.value
              : filterCookies?.createdDate ?? ""
          }
          ref={priceDateRef}
          type="date"
        />
      </div>
      <button
        onClick={(e) => handleSubmitFilter(e)}
        className="button__downloadPDF"
      >
        search
      </button>
    </div>
  );
};

export default TableFilter;
