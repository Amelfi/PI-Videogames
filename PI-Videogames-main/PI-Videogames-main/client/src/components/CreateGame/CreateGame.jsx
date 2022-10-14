import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, addGame, getAllGames } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import styles from "./Create.module.css";
import Loading from "../Loading/Loading";

// regular expressions
let url = /([a-z-_0-9/:.]*.(jpg|jpeg|png|gif))/i;
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

function setErrorFalse(input) {
  let error = {};
  if (input.name && nameReg.test(input.name)) {
    error.name = false;
  }
  if (input.background_image && url.test(input.background_image)) {
    error.image = false;
  }
  if (input.rating <= 5 && input.rating > 0) {
    error.rating = false;
  }
  if (input.description) {
    error.description = false;
  }
  if (input.genres.length > 0) {
    error.genres = false;
  }
  if (input.platforms.length > 0) {
    error.platforms = false;
  }
  console.log("first");
  return error;
}

const CreateGame = () => {
  const initialState = {
    name: "",
    background_image: "",
    rating: "",
    description: "",
    released: "",
    genres: [],
    platforms: [],
  };
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});

  let genre = useSelector((state) => state.genre);
  let games = useSelector((state) => state.games);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let platform = games?.map((el) => el.platforms);
  const dataArr = new Set(platform.flat(Infinity));
  let result = [...dataArr];

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllGames());
  }, [dispatch]);

  useEffect(() => {
    setErrors({ ...errors, ...setErrorFalse(input) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  // let genre= useSelector(state=>state.genre)

  let handleOnChage = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  let handleSelectChange = (e) => {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, e.target.value])],
    });
  };
  let handleSelectPlat = (e) => {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, e.target.value])],
    });
  };

  let handleDelete = (e) => {
    setInput({
      ...input,
      genres: [...input.genres.filter((el) => el !== e.target.value)],
      platforms: [...input.platforms.filter((el) => el !== e.target.value)],
    });
  };

  let handleOnSubmit = (e) => {
    e.preventDefault();

    if (
      errors.name === false &&
      errors.image === false &&
      errors.rating === false &&
      errors.description === false &&
      errors.platforms === false &&
      errors.genres === false
    ) {
      alert("The Game has been created");
      dispatch(addGame(input));
      navigate("/home");
    } else {
      setErrors({ ...errors, ...validator(input) });
    }
  };
  return !games.length ? (
    <Loading />
  ) : (
    <div className={styles.formContent}>
      <div className={styles.formCard}>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.head}>
            <h2 className={styles.h2}>Create New Game</h2>
          </div>

          <div className="form">
            <input
              type="text"
              name="name"
              id=""
              value={input.name}
              onChange={(e) => handleOnChage(e)}
              placeholder="Name"
              className={styles.select}
            />

            {errors.name && (
              <span className={styles.spa}>
                Name is required and must be whitout especial characters
              </span>
            )}

            <input
              type="text"
              name="background_image"
              id=""
              value={input.background_image}
              onChange={(e) => handleOnChage(e)}
              placeholder="Url Image"
              className={styles.select}
            />

            {errors.image && (
              <span className={styles.spa}>
                Image is required and must be a valid url
              </span>
            )}

            <input
              type="number"
              name="rating"
              id=""
              value={input.rating}
              onChange={(e) => handleOnChage(e)}
              placeholder="Rating"
              className={styles.select}
            />

            {errors.rating && (
              <span className={styles.spa}>Rating must be from 0 to 5</span>
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

            <textarea
              name="description"
              id=""
              value={input.description}
              onChange={(e) => handleOnChage(e)}
              placeholder="Description"
              rows="5"
              cols="50"
              className={styles.select}
            />

            {errors.description && (
              <span className={styles.spa}>Description is required </span>
            )}
            <div className={styles.error}>
            {input.genres?.map((el) => {
              return (
                <button
                  className={styles.delete}
                  key={el}
                  value={el}
                  onClick={(e) => handleDelete(e)}
                  title="Delete"
                >
                  {el}
                </button>
              );
            })}
            </div>
            <select
              onChange={(e) => handleSelectChange(e)}
              className={styles.select}
            >
              <option>Select Genre</option>
              {genre?.map((el) => {
                return (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                );
              })}
            </select>

            {errors.genres && (
              <span className={styles.spa}>Genre is required</span>
            )}

            <div className={styles.error}>
              {input.platforms?.map((el) => {
                return (
                  <button
                    className={styles.delete}
                    key={el}
                    value={el}
                    onClick={(e) => handleDelete(e)}
                    title="Delete"
                  >
                    {el}
                  </button>
                );
              })}
            </div>

            <select
              onChange={(e) => handleSelectPlat(e)}
              className={styles.select}
            >
              <option>Select Platform</option>
              {result.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>

            {errors.platforms && (
              <span className={styles.spa}>Platform is required </span>
            )}
          </div>

          <div className={styles.butons}>
            <input type="submit" value="Save" className={styles.buton} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
