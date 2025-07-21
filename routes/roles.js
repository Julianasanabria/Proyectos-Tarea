const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role.controller');
const auth = require('../middlewares/auth.middleware');

// Obtener todos los roles
router.get('/', auth.verifyToken, RoleController.getAllRoles);

// Obtener un rol por ID
router.get('/:id', auth.verifyToken, RoleController.getRoleById);

// Crear un nuevo rol
router.post('/', auth.verifyToken, RoleController.createRole);

// Actualizar un rol
router.put('/:id', auth.verifyToken, RoleController.updateRole);

// Eliminar un rol
router.delete('/:id', auth.verifyToken, RoleController.deleteRole);

module.exports = router;