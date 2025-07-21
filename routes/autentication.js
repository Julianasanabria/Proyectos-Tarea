import Routes from "express"
import AuthController from "../controllers/autentication.js"

const router = Routes()

// Registro de nuevo usuario
router.post('/register', AuthController.register);

// Inicio de sesión
router.post('/login', AuthController.login);

// Renovar token
router.post('/refresh', AuthController.refreshToken);

// Cerrar sesión
router.post('/logout', AuthController.logout);

// Recuperar contraseña
router.post('/forgot-password', AuthController.forgotPassword);

// Restablecer contraseña
router.post('/reset-password', AuthController.resetPassword);


export default router;