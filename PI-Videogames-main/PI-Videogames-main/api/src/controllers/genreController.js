const  axios  = require('axios');
const {Genre} = require('../db');
const {KEY} = process.env

 const showGenre = async (req, res) =>{
  try {
    const genreApi = await axios(`https://api.rawg.io/api/genres?key=${KEY}`)
    nameGenre = genreApi.data.results?.map((data)=>{
      return{
        name: data.name
      }
    })
    nameGenre.forEach((el) => {
      Genre.findOrCreate({where: el});
    });
     
     let nameDb = await Genre.findAll()

      res.json(nameDb)
  } catch (error) {
     res.status(400).json({error: error.message})
  }
}

module.exports= {showGenre}