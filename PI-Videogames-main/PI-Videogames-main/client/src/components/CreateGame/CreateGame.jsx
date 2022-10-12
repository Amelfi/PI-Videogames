import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, addGame } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.css"

// regular expressions
let url = /^(ftp|http|https):\/\/[^ "]+$/;
let nameReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/;

function validator(value) {
  let error = {};

  console.log("pase por aqui");

  if (!value.name || !nameReg.test(value.name)) {
    error.name = true;
  }
  if (!value.background_image || !url.test(value.background_image)) {
    error.image = true;
  }
  if (value.rating > 5 && value.rating < 0) {
    error.rating = true;
  }
  if (!value.description) {
    error.description = true;
  }

  if (!value.genres.length) {
    error.genres = true;
  }
  if (!value.platforms.length) {
    error.platforms = true;
  }

  if (Object.values(error).length) {
    alert("you must fill in all the fields");
  }
  return error;
}

const CreateGame = () => {
  const initialState = {
    name: "",
    background_image: "",
    rating: 0,
    description: "",
    released: "",
    genres: [],
    platforms: [],
  };
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});

  let genre = useSelector((state) => state.genre);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  // let genre= useSelector(state=>state.genre)

  let handleOnChage = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  let handleSelectChange = (e) => {
    setInput({ ...input, genres: [...e.target.name, e.target.value] });
  };
  let handleSelectPlat = (e) => {
    setInput({ ...input, platforms: [...e.target.name, e.target.value] });
  };

  let handleOnSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      console.log("2");
      setErrors(validator({ ...input, [e.target.name]: e.target.value }));
    }
    else if(!Object.values(errors).length) {
      alert("you must fill in all the fields");
      
    }

    else{
      console.log("3");
      alert('The Game has been created')
       dispatch(addGame(input));
 
       navigate("/home");

    }
    
  };
  return (
    <div className={styles.formContent}>
      <div className={styles.formCard}> 
       <form onSubmit={handleOnSubmit}>
        <div className={styles.head}>
            <h2 className={styles.h2}>Create New Game</h2>
        </div>
        
        <div className={styles.inputs}>
        <div className={styles.row1}>
          <input
            type="text"
            name="name"
            id=""
            value={input.name}
            onChange={(e) => handleOnChage(e)}
            placeholder="Name"
            className={styles.select}
          />
          {errors.name && !input.name ? (
            <span className={styles.spa}>Name is required and must be whitout especial characters</span>
          ) : (
            <span></span>
          )}
          <input
            type="text"
            name="background_image"
            id=""
            value={input.background_image}
            onChange={(e) => handleOnChage(e)}
            placeholder="Image"
            className={styles.select}
          />
          {errors.image && !input.image ? (
            <span className={styles.spa}>Image is required and must be a valid url </span>
          ) : (
            <span></span>
          )}
          <input
            type="text"
            name="rating"
            id=""
            value={input.rating}
            onChange={(e) => handleOnChage(e)}
            placeholder="Rating"
            className={styles.select}
          />
          {errors.rating ? (
            <span className={styles.spa}>Rating must be from 0 to 5</span>
          ) : (
            <span></span>
          )}
          <input
            type="date"
            name="released"
            id=""
            value={input.released}
            onChange={(e) => handleOnChage(e)}
            placeholder="Released"
            className={styles.select}
          />
    </div>
    <div className={styles.row2}>
        <textarea
          name="description"
          id=""
          value={input.description}
          onChange={(e) => handleOnChage(e)}
          placeholder="Description"
          rows="5" cols="50"
          className={styles.select}
        />
        {errors.description && !input.description ? (
          <span className={styles.spa}>Description is required </span>
        ) : (
          <span></span>
        )}
        <select onChange={(e) => handleSelectChange(e)} className={styles.select}>
          <option>Select Genre</option>
          {genre?.map((el) => {
            return (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            );
          })}
        </select>
        {errors.genres && !input.genres.length ? (
          <span className={styles.spa}>Genre is required</span>
        ) : (
          <span></span>
        )}
        <select onChange={(e) => handleSelectPlat(e)} className={styles.select}>
          <option>Select Platform</option>
          <option value="Xbox Series S/X">Xbox Series S/X</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Xbox 360">Xbox 360</option>
          <option value="Xbox One">Xbox One</option>
          <option value="PC">PC</option>
        </select>
        {errors.platforms && !input.platforms.length ? (
          <span className={styles.spa}>Platform is required </span>
        ) : (
          <span></span>
        )}
        </div>
        </div>
            <div className={styles.butons}>
                <input type="submit" value="Save" className={styles.buton}/>
            </div>
      </form>
        </div>            
    </div>
  );
};

export default CreateGame;
