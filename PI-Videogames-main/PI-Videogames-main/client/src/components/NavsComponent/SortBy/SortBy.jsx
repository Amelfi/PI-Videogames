import React from 'react'
import { useDispatch } from 'react-redux'
import { orderBy, orderByRating, reset, pages} from '../../../redux/action'

const SortBy = ({styles}) => {
   
    let dispatch = useDispatch()
    
    const handleOnChangeAlpha = (e)=>{
            dispatch(pages(1))
        if (e.target.value === "Ascending" ){
            dispatch(orderBy(e.target.value))
            
        }
        else if( e.target.value === "Descending" ){
            dispatch(orderBy(e.target.value))         
        }
        else if(e.target.value === "High"){
            dispatch(orderByRating(e.target.value))   
        } 
        else if(e.target.value === "Low"){
            dispatch(orderByRating(e.target.value))
            
        }else{
            dispatch(reset())
            
        }
    }
  return (
    <>                            
        <select className={styles.select} onChange={e=>handleOnChangeAlpha(e)}>
            <option>Sort By</option>
            <option value="Normal">Normal</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
            <option value="High">High Rating</option>
            <option value="Low">Low Rating</option>
        </select>
    </>
  )
}

export default SortBy