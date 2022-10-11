const {Videogame, Genre} = require('../db.js');
const axios = require('axios');
const {Op} = require('sequelize');
// const { v4: uuidv4 } = require('uuid');
const { KEY } = process.env;


let createGame = async(req, res) =>{
  const {name, background_image, genres, description, released, rating, platforms}= req.body
  try {
      if(!name, !background_image, !genres, !description){
          res.json("Fill in the required fields")
      }

      let newGame = await Videogame.create(
           {
             name, 
             image: background_image, 
             description, 
             released, 
             rating, 
             platforms
           }
         )
           let findGenre = await Genre.findAll({
             where:{name: genres}  
            
           })
   
           newGame.addGenres(findGenre)
   
           res.json({message: "The video game has been created"})     
    }
  
  catch (error)  
  {
    res.status(404).json({error: error})
  }
}


let showAllGames = async(req, res)=>{
  try {

    // Brings 100 pages from the api
    var api =[];
    for (let i = 1; i <= 5; i++) {
     let infoApi = await axios(`https://api.rawg.io/api/games?key=${KEY}&page=${i}`)

      //  save the data in the array api
       api.push( infoApi.data.results.map ((data) => {
            return{
                id: data.id,
                name: data.name,
                image: data.background_image,
                genres: data.genres?.map((el)=>el.name),   
                rating: data.rating
                
            }
        }))
      
 }
//  search data from the database
  let dbData= await Videogame.findAll({attributes: ['id', 'name', 'image', 'rating'], 
  include: {
    model: Genre
  }
  })
     let db = dbData?.map(el=> {
      return{
        id: el.id,
        name: el.name,
        image: el.image,
        genres: el.genres?.map(el=> el.name),
        rating: el.rating
      }

     })
      // concat the api data and the database data
      let allData=[...api.flat(), ...db]

    res.status(200).json(allData);

} catch (error)
 {
    res.status(500).json({error: 'Server error'})
  }
}

let showGamesById = async(req, res)=>{
  const {Id} = req.params
  try {
    //Search the Game by id in the database
    if(Id.includes('-')){
   
    let info = await Videogame.findAll({attributes: ['id', 'name', 'image', 'rating', 'description', 'released', 'platforms'], 
    include: {
      model: Genre      
    },
    where:{id:Id}
    }
       )  
        let dbInfo = info?.map(el=>{
          return{
              id: el.id,
              name: el.name,
              background_image: el.image,
              genres: el.genres?.map(el=> el.name),
              rating: el.rating,
              released: el.released,
              platforms: el.platforms?.map(el=>el),
              description: el.description
        
          }
        })


      res.status(200).json(...dbInfo)  

    }else{
      //Search the Game by id in the api
        let gameById = await axios(`https://api.rawg.io/api/games/${Id}?key=${KEY}`)
        const {id, name, background_image, genres, description, released, rating, platforms} = gameById.data;
                let apiInfo ={
                           id,
                          name, 
                          background_image, 
                          genres: genres?.map((el)=>el.name), 
                          description, 
                          released, 
                          rating, 
                          platforms: platforms?.map((el)=> el.platform.name)
                         }        
          res.status(200).json(apiInfo)
  }
}  
 catch (error) {

   res.status(404).json({error: 'Video game not found'})
 
  }
}

  let showGamesByName = async(req, res)=>{
    const {search} = req.query
    try {

        if(search){
        let gameByName = await axios(`https://api.rawg.io/api/games?search=${search}&key=${KEY}`)
        const apiName = gameByName.data.results?.map((data)=>{
            return{
                id: data.id,
                name: data.name, 
                image: data.background_image,
                rating: data.rating,
                genres: data.genres?.map((el)=>el.name) 
              
            }
        })

        let dbName= await Videogame.findAll({ 
      
        where: {
          name: {
            [Op.iLike]: `%${search}%`
          }
        },  include: {
          model: Genre
        }

        })
        let db= dbName?.map(el=>{
          return{
            id:el.id,
            name:el.name,
            image:el.image,
            rating:el.rating,
            genres: el.genres?.map(e=> e.name)
         
          }
        })
        let allData = [...apiName, ...db]

        res.json(allData)
}
      
    } catch (error) {
      res.status(404).json({error: 'Videogame no found'})
    }
  

  }

module.exports = {createGame, showAllGames, showGamesById, showGamesByName }