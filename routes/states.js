import Routes from "express"
import AuthController from "../controllers/states.js"

const router = Routes()

// Obtener todos los estados
router.get('/', AuthController.verifyToken, StateController.getAllStates);

// Obtener un estado por ID
router.get('/:id', AuthController.verifyToken, StateController.getStateById);

// Crear un nuevo estado
router.post('/', AuthController.verifyToken, StateController.createState);

// Actualizar un estado
router.put('/:id', AuthController.verifyToken, StateController.updateState);

// Eliminar un estado
router.delete('/:id', AuthController.verifyToken, StateController.deleteState);


export default router;