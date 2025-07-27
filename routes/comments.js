import Routes from "express";
import auth from '../middlewares/validar-jwt.js'
import CommentController from "../controllers/comments.js";

const router = Routes()

// Obtener todos los comentarios de un proyecto
router.get('/project/:id/comments', auth, CommentController.getProjectComments);

// Crear un comentario en un proyecto
router.post('/project/:id/comments', auth, CommentController.createComment);

// Editar un comentario
router.put('/comments/:id', auth, CommentController.updateComment);

// Eliminar un comentario
router.delete('/comments/:id', auth, CommentController.deleteComment);


export default router;
