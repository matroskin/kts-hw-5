import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from 'components/icons/ArrowIcon';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();

  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      onPageChange(pageNumber);
      const currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('page', pageNumber.toString());
      navigate(`?${currentUrlParams.toString()}`, { replace: true });
    },
    [navigate, onPageChange],
  );

  const pages = useMemo(() => {
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    const pagesArray = [];

    if (startPage > 1) {
      pagesArray.push(1);
      if (startPage > 2) {
        pagesArray.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesArray.push('...');
      }
      pagesArray.push(totalPages);
    }

    return pagesArray;
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={prevPage} disabled={currentPage === 1}>
        <ArrowIcon direction="right" />
      </button>

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={`${styles.button} ${currentPage === page ? styles.active : ''}`}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            ...
          </span>
        ),
      )}

      <button className={styles.button} onClick={nextPage} disabled={currentPage === totalPages}>
        <ArrowIcon direction="left" />
      </button>
    </div>
  );
};

export default React.memo(Pagination);
