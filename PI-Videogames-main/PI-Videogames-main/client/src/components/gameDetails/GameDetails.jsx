import React from "react";
import { getGameById} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from './GameDetails.module.css'

const GameDetails = () => {
  let { id } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameById(id));
  }, [dispatch, id]);

  let details = useSelector((state) => state.detail);
  let { name, genres, rating, background_image, platforms, description, released } =
    details;

  return (
    <div className={styles.content}>
      <div className={styles.card}>
      <div className={styles.head}>
            <h2 className={styles.h2}>{name}</h2>
        </div>
       <div className={styles.group}> 
      <div className={styles.imgcard}>
        <img src={background_image} alt="" className={styles.img}/>
      </div>
      <div className={styles.data}>       
        <p>
            <span className={styles.rating}><strong>Rating: </strong>{rating}</span>
            <strong> Released: </strong> {released}   
        </p> 
        <p><strong>Genres: </strong> {genres?.join(", ")} </p>
        <p><strong>Platforms: </strong>{platforms?.join(",  ")} </p>   
        <strong> Description: </strong>
       <div dangerouslySetInnerHTML={{__html:description}}/>
      </div>
      </div>
      </div>
   </div>
   
  );
};

export default GameDetails;
