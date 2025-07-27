import Comment from '../models/comments.js';
import user from '../models/users.js';
import Project from '../models/projects.js';

// Listar todos los comentarios
const CommentController = {
    getProjectComments: async (req, res) => {
        try {
            const { id: projectId } = req.params;

            // 1. Verificamos que el proyecto exista
            const project = await Project.findById(projectId);
            if (!project || !project.isActive) {
                return res.status(404).json({
                    success: false,
                    msg: 'Proyecto no encontrado o inactivo',
                });
            }

            // 2. Verificamos que el usuario sea miembro del proyecto (o Admin)
            const userId = req.user._id;
            const userIsOwner = project.owner.toString() === userId.toString();
            const userIsMember = project.members.some(
                (member) => member.user.toString() === userId.toString()
            );
            const userIsAdmin = req.user.globalRole?.name === 'Admin';

            if (!userIsOwner && !userIsMember && !userIsAdmin) {
                return res.status(403).json({
                    success: false,
                    msg: 'Acceso denegado. No eres miembro de este proyecto',
                });
            }

            // 3. Obtenemos commentarios con información del autor
            const comments = await Comment.find({ projectId })
                .populate('author', 'firstName lastName avatar')
                .sort({ createdAt: -1 }); // Del mas reciente al mas antiguo

            res.json({
                success: true,
                total: comments.length,
                comments,
            });
        } catch (error) {
            console.error('Error al listar comentarios:', error)
            res.status(500).json({
                success: false,
                msg: 'Error interno del servidor al obtener comentarios.',
            });
        }
    },

    // Crear un nuevo comentario en un proyecto
    createComment: async (req, res) => {
        try {
            const { id: projectId } = req.params;
            const { content } = req.body;
            const authorId = req.user._id;

            // 1. Validamos entrada del contenido
            if (!content || content.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: 'El contenido del comentario es obligatorio',
                });
            }

            // 2. Verificamos que el proyecto exista y esté activo
            const project = await Project.findById(projectId);
            if (!project || !project.isActive) {
                return res.status(404).json({
                    success: false,
                    msg: 'Proyecto no encontrado o inactivo.',
                });
            }

            // 3. Verificamos que el autor exista
            const author = await user.findById(authorId);
            if (!author || !author.isActive) {
                return res.status(404).json({
                    success: false,
                    msg: 'Usuario no encontrado o inactivo.',
                });
            }

            // 4. . Verificamos que el usuario tenga permiso para comentar (miembro, owner o Admin)
            const userIsOwner = project.owner.toString() === authorId.toString();
            const userIsMember = project.members.some(
                (member) => member.user.toString() === authorId.toString()
            );
            const userIsAdmin = req.user.globalRole?.name === 'Admin';

            if (!userIsOwner && !userIsMember && !userIsAdmin) {
                return res.status(403).json({
                    success: false,
                    msg: 'No tienes permiso para comentar en este proyecto.',
                });
            }

            // 5. Creamos el comentario
            const comment = new Comment({
                content: content.trim(),
                author: authorId,
                projectId,
            });
            
            await comment.save();

            // 6. Devolvemos el comentario con datos del author
            const commentPopulate = await Comment.findById(comment._id).populate(
                'author',
                'firstName lastName avatar'
            );

            res.status(201).json({
                success: true,
                msg: 'Comentaario creado con exito.',
                comment: commentPopulate,
            });
        } catch (error) {
            console.error('Error al crear el comentario:', error)
            res.status(500).json({
                success: false,
                msg: 'Error interno del servidor al crear el comentario.',
            });
        }
    },

    // Actualizar un comentario (solo el autor o Admin)
    updateComment: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const userId = req.user._id;

            // 1. Validamos el contenido del comentario
            if (!content || content.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: 'El contenido del comentario es obligatorio',
                });
            }

            // 2. Buscamos el comentario
            const comment = await Comment.findById(id);
            if (!comment) {
                return res.status(404).json({
                    success: false,
                    msg: 'Comentario no encontrado.',
                });
            }

            // 3. Verificamos que el proyecto exista
            const project = await Project.findById(comment.projectId);
            if (!project || !project.isActive) {
                return res.status(404).json({
                    success: false,
                    msg: 'Proyecto del comentario no encontrado o inactivo.',
                });
            }

            // 4. Verificamos autorización: solo el autor o Admin puede editar
            const userIsAuthor = comment.author.toString() === userId.toString();
            const userIsAdmin = req.user.globalRole?.name === 'Admin';

            if (!userIsAuthor && !userIsAdmin) {
                return res.status(403).json({
                    success: false,
                    msg: 'No puedes editar este comentario.',
                });
            }

            // 5. Actualizamos el comentario
            comment.content = content.trim();
            comment.editedAt = new Date();
            comment.updatedAt = new Date();

            await comment.save();

            // 6. Devolvemos el comentario actualizado
            const commentUpdated = await Comment.findById(id).populate(
                'author',
                'firstName lastName avatar'
            );

            res.json({
                success: true,
                msg: 'Comentario actualizado correctamente.',
                comment: commentUpdated,
            });
        } catch (error) {
            console.error('Error al actualizar el comentario:', error)
            res.status(500).json({
                success: false,
                msg: 'Error interno del servidor al actualizar el comentario.',
            });
        }
    },

    // Eliminar comentario (solo el autor o el Admin)
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user._id;

            // 1. Buscamos el comentario
            const comment = await Comment.findById(id);
            if (!comment) {
                return res.status(404).json({
                    success: false,
                    msg: 'Comentario no encontrado.',
                });
            }

            // 2. Verificar autorización: solo el autor o Admin puede eliminar
            const userIsAuthor = comment.author.toString() === userId.toString();
            const userIsAdmin = req.user.globalRole?.name === 'Admin';

            if (!userIsAuthor && !userIsAdmin) {
                return res.status(403).json({
                    success: false,
                    msg: 'No puedes eliminar este comentario.',
                });
            }

            // 3. Eliminamos el comentario
            await Comment.findByIdAndDelete(id);

            res.json({
                success: true,
                msg: 'Comentario eliminado correctamente.',
            });
        } catch (error) {
            console.error('Error al eliminar el comentario:', error)
            res.status(500).json({
                success: false,
                msg: 'Error interno del servidor al eliminar el comentario.',
            });
        }
    },
};

export default CommentController;