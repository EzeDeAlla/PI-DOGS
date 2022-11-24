import React from 'react';
import s from './paginado.module.css';


const Pagination = ({ dogsPerPage, totalDogs, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div>
        <nav className={s.nav}>
          <ul className={s.pagination}>
            {pageNumbers.map((number) => (
              <li key={number} className={s.listas}>
                <button > <span className={s.button_top} onClick={() => paginate(number)}>{number} </span></button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };

export default Pagination;