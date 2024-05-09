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
    onPageChange(currentPage - 1);
  };

  const nextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      onPageChange(pageNumber);
      const currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('page', pageNumber.toString());
      navigate(`?${currentUrlParams.toString()}`, { replace: true });
    },
    [navigate],
  );

  const pages = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);

  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={prevPage} disabled={currentPage === 1}>
        <ArrowIcon />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.button} ${currentPage === page ? styles.active : ''}`}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}

      <button className={styles.button} onClick={nextPage} disabled={currentPage === totalPages}>
        <ArrowIcon direction="left" />
      </button>
    </div>
  );
};

export default React.memo(Pagination);
