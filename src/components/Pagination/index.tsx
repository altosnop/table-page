import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  countSelector,
  nextPageSelector,
  prevPageSelector,
} from '../../store/table/tableSelectors';
import { setTableData } from '../../store/table/tableSlice';
import cls from './styles.module.css';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();

  const count = useAppSelector(countSelector);
  const next = useAppSelector(nextPageSelector);
  const previous = useAppSelector(prevPageSelector);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalResults = count;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      setTableData(
        `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${itemsPerPage}&offset=${
          (page - 1) * itemsPerPage
        }`
      )
    );
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      if (previous) {
        dispatch(setTableData(previous));
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

      if (next) {
        dispatch(setTableData(next));
      }
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const sectionSize = 3;

    const sectionStart = Math.max(1, currentPage - Math.floor(sectionSize / 2));
    const sectionEnd = Math.min(totalPages, sectionStart + sectionSize - 1);

    const result = [];

    if (sectionStart > 2) {
      result.push(1, '...');
    }

    for (let page = sectionStart; page <= sectionEnd; page++) {
      result.push(page);
    }

    if (sectionEnd < totalPages - 1) {
      result.push('...', totalPages);
    }

    return result.map((page: any, index) => {
      if (page === '...') {
        return (
          <span key={index} className={cls.span}>
            ...
          </span>
        );
      }

      return (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
            currentPage === page
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 bg-white hover:bg-gray-50 cursor-pointer'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className={cls.wrapper}>
      <nav className={cls.nav}>
        <button
          onClick={handlePrev}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNext}
          className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover-bg-gray-50 cursor-pointer'
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
