const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/ActivityController');

// Rutas para actividades
router.get('/', ActivityController.listActivities); // Listar actividades
router.get('/create', ActivityController.createActivityForm); // Mostrar formulario de creación
router.post('/create', ActivityController.createActivity); // Crear una actividad
router.get('/:id', ActivityController.getActivity); // Mostrar detalles de una actividad
router.get('/:id/edit', ActivityController.editActivityForm); // Mostrar formulario de edición
router.post('/:id/edit', ActivityController.updateActivity); // Actualizar una actividad
router.post('/:id/delete', ActivityController.deleteActivity); // Eliminar una actividad

module.exports = router;