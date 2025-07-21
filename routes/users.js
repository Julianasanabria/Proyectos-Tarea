import Routes from "express"
import AuthController from "../controllers/users.js"

const router = Routes()

// Obtener todos los usuarios
router.get('/', AuthController.verifyToken, UserController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', AuthController.verifyToken, UserController.getUserById);

// Actualizar un usuario
router.put('/:id', AuthController.verifyToken, UserController.updateUser);

// Eliminar un usuario
router.delete('/:id', AuthController.verifyToken, UserController.deleteUser);


export default router;