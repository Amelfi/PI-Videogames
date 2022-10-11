const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const {
//     createGenre
// } = require ('../controllers/genreController.js')
const {
showAllGames,
createGame,
showGamesById,
showGamesByName
}= require('../controllers/videoGameController.js')

const router = Router();

// Configurar los routers
router.post('/', createGame);
router.get('/name', showGamesByName);
router.get('/', showAllGames);
router.get('/:Id', showGamesById);



module.exports = router;
