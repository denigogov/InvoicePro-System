import { useState } from "react";
import "../../../Styling/Components/InvoiceComponentStyle/_invoiceTableSort.scss";
import { PaginationRequestType } from "../../../types/invoiceTypes";

interface TableSortProps {
  handleSort: (query: PaginationRequestType) => void;
}

const TableSort: React.FC<TableSortProps> = ({ handleSort }) => {
  const [activeSort, setActiveSort] = useState({
    field: "",
    direction: "",
  });
  const [sortByDate, setSortByDate] = useState({ field: "", direction: "" });

  const submitSort = (field: string, direction: string) => {
    setActiveSort({ field, direction });
    handleSort({ field, direction });

    if (field === "currentDate") {
      setSortByDate({ field, direction });
      setActiveSort({ ...activeSort, ...sortByDate });
    }

    document.cookie = `sortData=${encodeURIComponent(
      JSON.stringify(activeSort.field === "" ? { field, direction } : "")
    )}; max-age=${7 * 24 * 60 * 60}`;
  };

  const sortCookies = JSON.parse(
    decodeURIComponent(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)sortData\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    ) || "{}"
  );

  return (
    <div className="tableSort">
      <ul>
        <span>Sort By Client</span>
        <li
          className={
            (activeSort.field === "customerName" &&
              activeSort.direction === "asc") ||
            (sortCookies.field === "customerName" &&
              sortCookies.direction === "asc")
              ? "activeSort"
              : ""
          }
          onClick={() => submitSort("customerName", "asc")}
        >
          A-Z
        </li>
        <li
          className={
            (activeSort.field === "customerName" &&
              activeSort.direction === "desc") ||
            (sortCookies.field === "customerName" &&
              sortCookies.direction === "desc")
              ? "activeSort"
              : ""
          }
          onClick={() => submitSort("customerName", "desc")}
        >
          Z-A
        </li>
      </ul>

      <ul>
        <span>Sort By Total Price</span>
        <li
          className={
            (activeSort.field === "totalPrice" &&
              activeSort.direction === "asc") ||
            (sortCookies.field === "totalPrice" &&
              sortCookies.direction === "asc")
              ? "activeSort"
              : ""
          }
          onClick={() => submitSort("totalPrice", "asc")}
        >
          Low to High
        </li>
        <li
          className={
            (activeSort.field === "totalPrice" &&
              activeSort.direction === "desc") ||
            (sortCookies.field === "totalPrice" &&
              sortCookies.direction === "desc")
              ? "activeSort"
              : ""
          }
          onClick={() => submitSort("totalPrice", "desc")}
        >
          High to Low
        </li>
      </ul>

      <ul>
        <span>Sort By Created Date</span>
        <li
          className={
            (sortByDate.field && sortByDate.direction === "asc") ||
            (sortCookies.field === "currentDate" &&
              sortCookies.direction === "asc")
              ? "activeSort"
              : ""
          }
          onClick={() => submitSort("currentDate", "asc")}
        >
          Oldest to top
        </li>
        <li
          className={
            (sortByDate.field && sortByDate.direction === "desc") ||
            (sortCookies.field === "currentDate" &&
              sortCookies.direction === "desc")
              ? "activeSort"
              : ""
          }
          onClick={() => submitSort("currentDate", "desc")}
        >
          Newest to top
        </li>
      </ul>
    </div>
  );
};

export default TableSort;
