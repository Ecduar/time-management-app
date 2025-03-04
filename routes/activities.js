const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/ActivityController');

// Definir rutas para Actividades
router.get('/', ActivityController.listActivities);
router.post('/', ActivityController.addActivity);
router.get('/:id', ActivityController.getActivity);
router.put('/:id', ActivityController.updateActivity);
router.delete('/:id', ActivityController.deleteActivity);

module.exports = router;