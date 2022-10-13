import { 
  GET_ALL_GAMES, 
  GET_GAME_BY_ID, 
  GET_GAMES_BY_NAME, 
  GET_ALL_GENRES, 
  ADD_GAME,
  GET_GAMES_BY_GENRE,
  ORDER_BY,
  ORDER_BY_RATING,
  FILTER_DB,
  RESET,
  RESET_DETAIL,
  PAGES,
  FILTER_API
 } from "../action";

const initialState={
  games: [],
  detail: {},
  genre:[],
  backgames:[],
  page: 1
}
const rootReducer = (state = initialState, action)=>{
  switch (action.type) {
    case GET_ALL_GAMES:
      return{
        ...state,
        games: action.payload,
        backgames: action.payload

      }
      
    case GET_GAME_BY_ID:
      return{
        ...state,
        detail: action.payload
      }

    case GET_GAMES_BY_NAME:
      return{
        ...state,
        games: action.payload
      }  

    case ADD_GAME:
      return{
        ...state
      }
    case GET_ALL_GENRES:
      return{
        ...state,
        genre: action.payload
        }
    case GET_GAMES_BY_GENRE:
      let genres= state.backgames.filter(el=> el.genres.join(',').toLowerCase().includes(action.payload.toLowerCase()))   
        if(!genres.length){
          alert('Game not found')
        }
      return{
        ...state,
        games: genres.length?genres: state.backgames
            
          }
    case ORDER_BY:
      let orderGame = action.payload === "Ascending" 
            ? [...state.backgames].sort((a,b) => a.name.localeCompare(b.name))
            : [...state.backgames].sort((a,b)=> b.name.localeCompare(a.name))
            
        return{
          ...state,
          games: orderGame
        }

        case ORDER_BY_RATING:
          let orderRating  = action.payload === "High" 
          ? [...state.backgames].sort((a,b) => b.rating.toString().localeCompare(a.rating, undefined, { numeric: true }))
          : [...state.backgames].sort((a,b)=> a.rating.toString().localeCompare(b.rating, undefined, { numeric: true }))

            
          return{
            ...state,
            games: orderRating,
          }

        case FILTER_DB:
          let data = state.backgames.filter(e=> isNaN(e.id))
          let searchData = data.filter(e=> e.name.toLowerCase().includes(action.payload.toLowerCase()))
          console.log(data.searchData)
          if(!searchData.length){
            alert('Game not found')
            
          }
      
          return{
              ...state,
              games: searchData.length? searchData: state.games,
              page: state.page
          }
        case FILTER_API:
          console.log(action.payload)
          let dataApi = state.backgames.filter(el=> !isNaN(el.id))
          let searchDataApi = dataApi.filter(el=> el.name.toLowerCase().includes(action.payload.toLowerCase()))
          console.log('aqui'+searchDataApi)
          if(!searchDataApi.length){
            alert('Game not found')
            
          }
          return{
              ...state,
              
              games: searchDataApi.length? searchDataApi: state.games,
              
          }
        case RESET:
         
          return{
            ...state,
            games: state.backgames
          }
        case RESET_DETAIL:
          return{
            ...state,
            detail: {}
          }
          case PAGES:
          return{
          ...state,
          page: action.payload
          }
    default:
      return state;
  }
}


export default rootReducer;