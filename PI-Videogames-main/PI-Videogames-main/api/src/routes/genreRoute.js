const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    showGenre
} = require ('../controllers/genreController.js')


const router = Router();

// Configurar los routers

router.get('/', showGenre);



module.exports = router;