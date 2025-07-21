const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');
const auth = require('../middlewares/auth.middleware');

// Listar todas las tareas
router.get('/', auth.verifyToken, TaskController.getAllTasks);

// Obtener una tarea por ID
router.get('/:id', auth.verifyToken, TaskController.getTaskById);

// Crear una nueva tarea
router.post('/', auth.verifyToken, TaskController.createTask);

// Actualizar una tarea
router.put('/:id', auth.verifyToken, TaskController.updateTask);

// Eliminar una tarea
router.delete('/:id', auth.verifyToken, TaskController.deleteTask);

module.exports = router;