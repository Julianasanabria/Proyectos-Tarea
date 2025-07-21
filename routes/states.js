const express = require('express');
const router = express.Router();
const StateController = require('../controllers/state.controller');
const auth = require('../middlewares/auth.middleware');

// Obtener todos los estados
router.get('/', auth.verifyToken, StateController.getAllStates);

// Obtener un estado por ID
router.get('/:id', auth.verifyToken, StateController.getStateById);

// Crear un nuevo estado
router.post('/', auth.verifyToken, StateController.createState);

// Actualizar un estado
router.put('/:id', auth.verifyToken, StateController.updateState);

// Eliminar un estado
router.delete('/:id', auth.verifyToken, StateController.deleteState);

module.exports = router;