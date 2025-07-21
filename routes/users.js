import Routes from "express"
import userController from "../controllers/users.js"
import AuthController from "../controllers/autentication.js";

const router = Routes()

// Obtener todos los usuarios
router.get('/', AuthController.verifyToken, userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', AuthController.verifyToken, userController.getUserById);

// Actualizar un usuario
router.put('/:id', AuthController.verifyToken, userController.updateUser);

// Eliminar un usuario
router.delete('/:id', AuthController.verifyToken, userController.deleteUser);

// Cambiar rol
router.put('/:id/role', AuthController.verifyToken, userController.changeRole);
export default router;