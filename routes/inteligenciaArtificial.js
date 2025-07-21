const express = require('express');
const router = express.Router();
const AIController = require('../controllers/ai.controller');
const auth = require('../middlewares/auth.middleware');

// Generar tareas automáticamente según descripción del proyecto
router.post('/generate-tasks', auth.verifyToken, AIController.generateTasks);

// Analizar un proyecto y sugerir mejoras
router.post('/analyze-project', auth.verifyToken, AIController.analyzeProject);

// Estimar tiempo para tareas
router.post('/estimate-time', auth.verifyToken, AIController.estimateTime);

// Generar resumen del proyecto
router.post('/generate-summary', auth.verifyToken, AIController.generateSummary);

// Sugerencias de mejora basadas en comentarios y estados
router.post('/suggest-improvements', auth.verifyToken, AIController.suggestImprovements);


export default router;
