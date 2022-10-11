import React from 'react';
import { getGamesByName, getGamesByGenres, filterByDb, pages } from '../../../redux/action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SearchBar = ({styles}) => {
    let dispatch= useDispatch()
    let [search, setSearch]= useState('')
    let [option, setOption] =useState('')

   const handleChange=(e)=>{
   
    setSearch(e.target.value)
    
   }
   const handleOption=(e)=>{
    setOption(e.target.value)
   }
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(pages(1))
        
        if(option === 'Genre'){
            dispatch(getGamesByGenres(search))
           
        }
        else if(option === 'Created'){
            dispatch(filterByDb(search))

        }else{
            dispatch(getGamesByName(search))
        }
    }

        
    return (
    
       
        <form onSubmit={e=>handleSubmit(e)} className={styles.sort}>
                <select onChange={handleOption} className={styles.select}>
                    <option >Search By</option>
                    <option value='Name'>Name</option>
                    <option value='Genre'>Genre</option>                                                                    
                    <option value='Created'>Games Created</option>                                                                    
                </select>
          
           
                <input type="text" name="search" value={search} onChange={e=>handleChange(e)} className={styles.select} placeholder="Search"/>
           
            <input className={styles.buton} type="submit"  value="Search" />
        </form>

        
    
  )
}

export default SearchBar