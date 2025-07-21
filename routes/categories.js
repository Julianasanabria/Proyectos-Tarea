import Routes from "express"
import AuthController from "../controllers/categories.js"

const router = Routes()

// Obtener todas las categorías (protegido)
router.get('/', AuthController.verifyToken, CategoryController.getAll);

// Crear una categoría (protegido)
router.post('/', AuthController.verifyToken, CategoryController.create);

// Actualizar una categoría por ID (protegido)
router.put('/:id', AuthController.verifyToken, CategoryController.update);

// Eliminar una categoría por ID (protegido)
router.delete('/:id', AuthController.verifyToken, CategoryController.delete);


export default router;
