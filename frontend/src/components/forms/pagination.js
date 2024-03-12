import React, { useState, useEffect } from 'react';

export default function Pagination({ onPageChange = null, itemsPerPage, totalItems }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState([]);
  const [currentPageGroupStart, setCurrentPageGroupStart] = useState(0);

  useEffect(() => {
    setDisplayedPages(Array.from({ length: totalItems }, (_, i) => i + 1));
  }, [totalItems]);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % itemsPerPage === 0) {
        setCurrentPageGroupStart(currentPage - itemsPerPage);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalItems) {
      setCurrentPage(currentPage + 1);
      if ((currentPage + 1) % itemsPerPage === 1) {
        setCurrentPageGroupStart(currentPage);
      }
    }
  };

  return (
    <div className='flex '>
      <div className='border border-gray-300'>
        <button onClick={handlePreviousPage}
            disabled={currentPage===0}
            className='p-2'
            style={{ color: currentPage === 1 ? 'black' :'var(--primary-color)' }}

            >{"<<"}
        </button>
        {displayedPages.slice(currentPageGroupStart, currentPageGroupStart + itemsPerPage).map((pageNumber) => (
          <button
            className="p-2"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            style={{ color:currentPage!==pageNumber?'var(--primary-color)':'white',backgroundColor: currentPage === pageNumber ? 'var(--primary-color)' : '' }}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage}
                className='p-2'
                disabled={currentPage===totalItems}
                style={{ color: currentPage === totalItems ? 'black' :'var(--primary-color)' }}

        >{">>"}
        </button>
      </div>
    </div>
  );
}
