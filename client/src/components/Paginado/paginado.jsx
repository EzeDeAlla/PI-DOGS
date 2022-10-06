import React, { useState } from 'react';
import styles from './paginado.module.css';


const Pagination = ({page, setPage, total}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => {
        setCurrentPage(parseInt(currentPage)+1);
        setPage(parseInt(page)+1);
    };

    const previousPage = () => {
        setCurrentPage(parseInt(currentPage)-1);
        setPage(parseInt(page)-1);
    };

    const handleInputs=(e)=> {
        setCurrentPage(parseInt(e.target.value));
        setPage(parseInt(e.target.value));
    };

    const pageNumbers = [];
    for (let i=1; i<=total; i++){
        pageNumbers.push(i);
    };

    return (
        <div className={styles.contentPagination}>
            <button disabled={page === 1 || page < 1} onClick={previousPage} className={styles.paginationButton}>
                <span className='title'>↩</span>
            </button>
        { pageNumbers &&
          pageNumbers.map((e) => (
            <button value={e} onClick={(e) => handleInputs(e)} key={e} className={`${styles.paginationButton} ${currentPage === parseInt(e) ? styles.inputActive : null}`}>{e}</button>
          ))}
          <button disabled={page === total || page > total} onClick={nextPage} className={styles.paginationButton}>
            <span className='title'>↪</span>
          </button>
        </div>
    );
};

export default Pagination;