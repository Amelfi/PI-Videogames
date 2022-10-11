import React from 'react';
import styles from './homePage.module.css';
import GameCard from '../Cards/GameCard';
import { useEffect } from 'react';
import{useDispatch, useSelector} from 'react-redux'
import { getAllGames, pages } from '../../redux/action';
import Pagination from '../Pagination/Pagination';



const Home = () => {
  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();
 
  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = useSelector(state=> state.page)
  const videoGamesPage = 15;
  const indexOfLastVideoGame = currentPage * videoGamesPage;
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPage;
  const currentVideoGames = games?.slice(indexOfFirstVideoGame,indexOfLastVideoGame) 
  
  const paginate = (pageNumber) =>{
      dispatch(pages(pageNumber))
  }
  
  useEffect(() => {
    dispatch(getAllGames());
  },[dispatch]);
  
  return (
    <>
    
    <div className={styles.container}>

      {currentVideoGames?.map((el, index) => {
        return (
          <div key={index}>
            <GameCard
              id={el.id}
              name={el.name}
              image={el.image}
              genre={el.genres}
              rating={el.rating} />
          </div>

);

      })}
    </div>
<Pagination
    videoGamesPage={videoGamesPage}
    games={games.length}
    paginate={paginate} />
  </>
  )
}

export default Home