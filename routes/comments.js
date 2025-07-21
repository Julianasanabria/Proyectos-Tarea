const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');

// Obtener todos los comentarios de un proyecto
router.get('/project/:id', auth.verifyToken, CommentController.getProjectComments);

// Crear un comentario en un proyecto
router.post('/project/:id', auth.verifyToken, CommentController.createComment);

// Editar un comentario
router.put('/:id', auth.verifyToken, CommentController.updateComment);

// Eliminar un comentario
router.delete('/:id', auth.verifyToken, CommentController.deleteComment);

module.exports = router;
