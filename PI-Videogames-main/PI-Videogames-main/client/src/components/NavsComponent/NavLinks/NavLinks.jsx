import React from 'react'
import { Link } from 'react-router-dom'
import { resetDetail } from '../../../redux/action'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const NavLinks = ({styles}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  let linkName
  const handleOnClick=()=>{
    dispatch(resetDetail())
  }
  location.pathname ==="/"? linkName ='Start':  linkName= "Home";                                       
  return (
    
    
        <div className={styles.group}>
            <ul className={styles.ul}>
                <li className={styles.li} onClick={handleOnClick}><Link className={styles.a} to={'/home'}>{linkName}</Link></li>
                {location.pathname !=="/" && <li className={styles.li}><Link className={styles.a} to={'/create'}>Create</Link></li>}
            </ul>
        </div>
   
  )
}

export default NavLinks