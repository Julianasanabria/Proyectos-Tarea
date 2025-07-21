
import Routes from "express"
import AuthController from "../controllers/tasks.js"

const router = Routes()

// Listar todas las tareas
router.get('/', AuthController.verifyToken, TaskController.getAllTasks);

// Obtener una tarea por ID
router.get('/:id', AuthController.verifyToken, TaskController.getTaskById);

// Crear una nueva tarea
router.post('/', AuthController.verifyToken, TaskController.createTask);

// Actualizar una tarea
router.put('/:id', AuthController.verifyToken, TaskController.updateTask);

// Eliminar una tarea
router.delete('/:id', AuthController.verifyToken, TaskController.deleteTask);

export default router;