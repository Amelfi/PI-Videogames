import React from "react";

import "./Pagination.css";

export default function Paginate({
    videoGamesPage,
    games,
    paginate,
    currentPage

 
}) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(games / videoGamesPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='ul'>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className='li' key={number}>
                <button className={number === currentPage ? 'current' : 'paginate'} onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    );
  }
  