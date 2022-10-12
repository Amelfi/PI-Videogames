import React from "react";
import { useSelector } from "react-redux";
import "./Pagination.css";

export default function Paginate({
    videoGamesPage,
    games,
    paginate}) {

    const pageNumbers = [];
      let currentPage = useSelector(state=> state.page)
    for (let i = 1; i <= Math.ceil(games / videoGamesPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      // <nav>
      //   <ul className='ul'>
      //     {pageNumbers &&
      //       pageNumbers.map((number, index) => (
      //         <li className='li'>
      //           <button  key={index} className={number === currentPage ? 'active' :''} onClick={() => paginate(number)}>
      //             {number}
      //             {console.log(number)}
      //           </button>
      //          </li> 
      //       ))}
      //   </ul>
      // </nav>
      <div className='pagination'>
      {pageNumbers && pageNumbers.map((page, index) => {
          return (
              <button
                  key={index}
                  onClick={() => paginate(page)}
                  className={page === currentPage ? "active" : ""}>
                  {page}
              </button>
          );
      })}
  </div>
    );
  }
  