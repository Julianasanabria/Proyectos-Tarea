const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth.middleware');

// Obtener todas las categorías (protegido)
router.get('/', auth.verifyToken, CategoryController.getAll);

// Crear una categoría (protegido)
router.post('/', auth.verifyToken, CategoryController.create);

// Actualizar una categoría por ID (protegido)
router.put('/:id', auth.verifyToken, CategoryController.update);

// Eliminar una categoría por ID (protegido)
router.delete('/:id', auth.verifyToken, CategoryController.delete);


export default router;
