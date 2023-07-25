const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Usercontrollers');

router.get('/', controllers.vistaLogin);
router.post('/login', controllers.login);

router.get('/registrar', controllers.vistaRegistrar);
router.post('/registrar', controllers.registrarUsuario);

router.get('/dash', controllers.vistaDash);

router.post('/chat', controllers.generar);

router.get('/usuarios', controllers.obtenerUsuarios);

router.delete('/usuarios/:userId', controllers.borrarUsuario);
router.get('/usuarios/:id', controllers.buscarUsuario);

router.put('/actualizar', controllers.actualizarUsuario);

module.exports = router;