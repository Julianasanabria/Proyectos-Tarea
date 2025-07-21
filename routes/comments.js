import Routes from "express"
import AuthController from "../controllers/comments.js"

const router = Routes()

// Obtener todos los comentarios de un proyecto
router.get('/project/:id', AuthController.verifyToken, CommentController.getProjectComments);

// Crear un comentario en un proyecto
router.post('/project/:id', AuthController.verifyToken, CommentController.createComment);

// Editar un comentario
router.put('/:id', AuthController.verifyToken, CommentController.updateComment);

// Eliminar un comentario
router.delete('/:id', AuthController.verifyToken, CommentController.deleteComment);


export default router;
