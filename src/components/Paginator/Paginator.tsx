import React from 'react';

import styles from './paginator.module.css';
import next from '../../assets/next.png'
import prev from '../../assets/prev.png'

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

const Pagination = (props: PaginationProps) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={styles.paginator}>
      <button
        className={styles.arrow}
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        <img src={prev} alt="arrow" />
      </button>
      {nav && (
        <span className={styles.navigation} > {nav.current} / {nav.total} </span>
      )}
      <button
        className={styles.arrow}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
          <img src={next} alt="arrow" />
      </button>
    </div>
  );
};

export default React.memo(Pagination);