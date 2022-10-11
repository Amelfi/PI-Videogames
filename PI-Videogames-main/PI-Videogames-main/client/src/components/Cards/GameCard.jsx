import React from 'react'
import { Link } from 'react-router-dom'
import styles from './gameCard.module.css'

const GameCard = ({id, name, rating, image, genre}) => {
  return (
    <div className={styles.card}>
        
            <img className={styles.img} src= {image} alt="not found"/>
          
       
        <div className={styles.content}>
            <h3 className={styles.h3}>{name}</h3>
            
              <p className={styles.p}>{genre.join(" ")}</p>
           
            
            <p className={styles.p}>{rating}</p>
            <Link className={styles.link} to={`/detail/${id}`}>More</Link>

        </div>
    </div>
  )
}

export default GameCard