const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project.controller');
const auth = require('../middlewares/auth.middleware');

// Listar proyectos del usuario autenticado
router.get('/', auth.verifyToken, ProjectController.getProjectsByUser);

// Crear un nuevo proyecto
router.post('/', auth.verifyToken, ProjectController.createProject);

// Obtener un proyecto específico
router.get('/:id', auth.verifyToken, ProjectController.getProjectById);

// Actualizar un proyecto
router.put('/:id', auth.verifyToken, ProjectController.updateProject);

// Eliminar un proyecto
router.delete('/:id', auth.verifyToken, ProjectController.deleteProject);

// Agregar miembro al proyecto
router.post('/:id/members', auth.verifyToken, ProjectController.addMember);

// Remover miembro del proyecto
router.delete('/:id/members/:userId', auth.verifyToken, ProjectController.removeMember);

// Cambiar el estado del proyecto
router.put('/:id/status', auth.verifyToken, ProjectController.updateProjectStatus);


export default router;
