import axios from "axios";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_GAME_BY_ID ="GET_GAME_BY_ID";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const ADD_GAME = "ADD_GAME";
export const ORDER_BY_RATING= "ORDER_BY_RATING";
export const GET_GAMES_BY_GENRE= 'GET_GAMES_BY_GENRE';
export const ORDER_BY ="ORDER_BY";
export const FILTER_DB ="FILTER_DB";
export const RESET = "RESET";
export const RESET_DETAIL = "RESET_DETAIL";
export const PAGES = "PAGES";

export const getAllGames = ()=>{
    return async (dispatch)=>{
   try {
    let json = await axios.get("http://localhost:3001/game")
        
    return dispatch({
             type: GET_ALL_GAMES,
             payload: json.data
            })
   } catch (error) {
     console.log(error)
   }
       
        
        
       } 
    

}
 export const getGameById =(id)=>{
    return async(dispatch)=>{
        let json = await axios.get(`http://localhost:3001/game/${id}`)
        return dispatch({
            type: GET_GAME_BY_ID,
            payload: json.data
        })
    }

 }
 export const getGamesByName = (name)=>{
    return async (dispatch)=>{
        let json = await axios.get(`http://localhost:3001/game/name?search=${name}`)
        return dispatch({
            type: GET_GAMES_BY_NAME,
            payload: json.data
        })
    }
 }
 
 export const getAllGenres = ()=>{
    return async (dispatch)=>{
        let json = await axios.get(`http://localhost:3001/genre`)
        return dispatch({
            type: GET_ALL_GENRES,
            payload: json.data
        })
    }
 }

 export const addGame =(payload)=>{
    return async(dispatch)=>{
      let json= await axios.post(`http://localhost:3001/game`, payload)
        return json;
    }
 }
 export const orderByRating =(payload)=>{
    return (dispatch)=>{
        return dispatch({
            type: ORDER_BY_RATING,
            payload

    })
    }
 }
 export const getGamesByGenres=(payload)=>{
    return (dispatch)=>{
        return dispatch({
            type: GET_GAMES_BY_GENRE,
            payload
        })
    }
 }
 export const orderBy =(payload)=>{
    return (dispatch)=>{
        return dispatch({
            type: ORDER_BY,
            payload
        })
    }

 }
 export const filterByDb =(payload)=>{
    return (dispatch)=>{
        return dispatch({
            type: FILTER_DB,
            payload
        })
    }

 }


export const reset= ()=>{
    return (dispatch)=>{
        return dispatch({
            type: RESET,
            
        })
    }
}
export const resetDetail= ()=>{
    return (dispatch)=>{
        return dispatch({
            type: RESET_DETAIL,
            
        })
    }
}

export const pages=(payload)=>{
    return(dispatch)=>{
        return dispatch({
            type: PAGES,
            payload
        })
    }
}