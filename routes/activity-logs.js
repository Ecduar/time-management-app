const express = require('express');
const router = express.Router();
const ActivityLogController = require('../controllers/ActivityLogController');

// Rutas para registros de actividades
router.get('/', ActivityLogController.listActivityLogs);
router.post('/', ActivityLogController.addActivityLog);
router.get('/:id', ActivityLogController.getActivityLog);
router.put('/:id', ActivityLogController.updateActivityLog);
router.delete('/:id', ActivityLogController.deleteActivityLog);

module.exports = router;