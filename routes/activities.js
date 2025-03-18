const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/ActivityController');

// Rutas para actividades
router.get('/', ActivityController.listActivities);
router.get('/create', ActivityController.createActivityForm);
router.post('/create', ActivityController.createActivity);
router.get('/:id', ActivityController.getActivity);
router.get('/:id/edit', ActivityController.editActivityForm);
router.post('/:id/edit', ActivityController.updateActivity);
router.post('/:id/delete', ActivityController.deleteActivity);

module.exports = router;