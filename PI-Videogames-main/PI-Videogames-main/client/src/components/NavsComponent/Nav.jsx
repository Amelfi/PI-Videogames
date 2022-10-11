import React from 'react'
import styles from './Nav.module.css'
import SearchBar from './SearchBar/SearchBar'
import SortBy from './SortBy/SortBy.jsx'
import NavLinks from './NavLinks/NavLinks'
import { useLocation } from 'react-router-dom'

const Nav = () => {
  const location = useLocation();
  return (
    <div className={styles.header}>   
            <NavLinks styles={styles}/>
      <div className = {styles.sort}>
          {location.pathname ==="/home"&&<SortBy styles={styles}/>}
          { location.pathname ==="/home"&&<SearchBar styles={styles}/>}
      </div>    
    </div>
  )
}

export default Nav