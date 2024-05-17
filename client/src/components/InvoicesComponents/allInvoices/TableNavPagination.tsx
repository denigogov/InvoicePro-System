import { useState } from "react";
import { PaginationSettingsType } from "../../../types/invoiceTypes";

interface TableNavPaginationProps {
  pageIndex: number;
  handleNextPage: (e: number) => void;
  totalPagePagination: number[];
  paginationSettings?: PaginationSettingsType;
}

const TableNavPagination: React.FC<TableNavPaginationProps> = ({
  totalPagePagination,
  handleNextPage,
  pageIndex,
  paginationSettings,
}) => {
  const [currentRange, setCurrentRange] = useState(0);
  const pagesPerBatch = 7;

  const totalPages = paginationSettings?.totalPages || 0;

  const handleShowNextRange = () => {
    setCurrentRange((prevRange) => prevRange + pagesPerBatch);
  };

  const handleShowPreviousRange = () => {
    setCurrentRange((prevRange) =>
      prevRange > 0 ? prevRange - pagesPerBatch : 0
    );
  };

  const startPage = currentRange + 1;
  const endPage = Math.min(currentRange + pagesPerBatch, totalPages);

  const displayedPages = totalPagePagination.slice(startPage - 1, endPage);

  return (
    <div className="allInvoices__button width600">
      {pageIndex > 1 && (
        <button onClick={() => handleNextPage(pageIndex - 1)}>Previous</button>
      )}

      {currentRange > 0 && <span onClick={handleShowPreviousRange}>...</span>}

      {displayedPages.map((pages) => (
        <span
          className={paginationSettings?.page === pages ? "activePage" : ""}
          onClick={() => handleNextPage(pages)}
          key={pages}
        >
          {pages}
        </span>
      ))}

      {endPage < totalPages && <span onClick={handleShowNextRange}>...</span>}

      {paginationSettings?.page !== paginationSettings?.totalPages && (
        <button onClick={() => handleNextPage(pageIndex + 1)}>Next</button>
      )}
    </div>
  );
};

export default TableNavPagination;
