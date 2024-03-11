import React, { useState, useEffect } from 'react';

export default function Pagination({ onPageChange = () => { console.log('hello') }, length = 9, totalLength = 100 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState([]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalLength) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handlePreviousPage}>{"<<"}</button>
        {displayedPages.map((pageNumber) => (
          <button
            className="border border-gray-300 p-2"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            style={{ backgroundColor: currentPage === pageNumber ? 'var(--secondary-color)' : 'whitesmoke' }}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage}>{">>"}</button>
      </div>
    </div>
  );
}
