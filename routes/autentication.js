const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

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

module.exports = router;
