const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

// Obtener todos los usuarios
router.get('/', auth.verifyToken, UserController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', auth.verifyToken, UserController.getUserById);

// Actualizar un usuario
router.put('/:id', auth.verifyToken, UserController.updateUser);

// Eliminar un usuario
router.delete('/:id', auth.verifyToken, UserController.deleteUser);

module.exports = router;