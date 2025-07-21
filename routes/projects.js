import Routes from "express"
import AuthController from "../controllers/projects.js"

const router = Routes()

// Listar proyectos del usuario autenticado
router.get('/', AuthController.verifyToken, ProjectController.getProjectsByUser);

// Crear un nuevo proyecto
router.post('/', AuthController.verifyToken, ProjectController.createProject);

// Obtener un proyecto específico
router.get('/:id', AuthController.verifyToken, ProjectController.getProjectById);

// Actualizar un proyecto
router.put('/:id', AuthController.verifyToken, ProjectController.updateProject);

// Eliminar un proyecto
router.delete('/:id', AuthController.verifyToken, ProjectController.deleteProject);

// Agregar miembro al proyecto
router.post('/:id/members', AuthController.verifyToken, ProjectController.addMember);

// Remover miembro del proyecto
router.delete('/:id/members/:userId', AuthController.verifyToken, ProjectController.removeMember);

// Cambiar el estado del proyecto
router.put('/:id/status', AuthController.verifyToken, ProjectController.updateProjectStatus);
export default router;
