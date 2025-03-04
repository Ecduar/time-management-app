const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

// Definir rutas para proyectos
router.get('/', ProjectController.listProjects);
router.post('/', ProjectController.addProject);
router.get('/:id', ProjectController.getProject);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;