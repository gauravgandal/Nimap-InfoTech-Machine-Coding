// src/components/Pagination.jsx

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ page, setPage, totalPages }) => {
  const maxPagesToShow = 5;
  const halfMaxPages = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, page - halfMaxPages);
  let endPage = Math.min(totalPages, page + halfMaxPages);

  if (page - halfMaxPages < 1) {
    endPage = Math.min(totalPages, endPage + (1 - (page - halfMaxPages)));
  }
  if (page + halfMaxPages > totalPages) {
    startPage = Math.max(1, startPage - (page + halfMaxPages - totalPages));
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`p-2 px-4 bg-blue-600 text-white rounded-full shadow-md ${
          page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        } transition-all flex items-center justify-center`}
      >
        <FaChevronLeft className="text-lg" />
      </button>

      <div className="flex items-center mx-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`p-2 px-4 ${
              page === pageNumber
                ? "bg-blue-700 text-white font-bold"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } rounded-full mx-1 transition-all flex items-center justify-center`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`p-2 px-4 bg-blue-600 text-white rounded-full shadow-md ${
          page === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-700"
        } transition-all flex items-center justify-center`}
      >
        <FaChevronRight className="text-lg" />
      </button>
    </div>
  );
};

export default Pagination;
