import Routes from "express"
import AuthController from "../controllers/roles.js"

const router = Routes()

// Obtener todos los roles
router.get('/', AuthController.verifyToken, RoleController.getAllRoles);

// Obtener un rol por ID
router.get('/:id', AuthController.verifyToken, RoleController.getRoleById);

// Crear un nuevo rol
router.post('/', AuthController.verifyToken, RoleController.createRole);

// Actualizar un rol
router.put('/:id', AuthController.verifyToken, RoleController.updateRole);

// Eliminar un rol
router.delete('/:id', AuthController.verifyToken, RoleController.deleteRole);

export default router;