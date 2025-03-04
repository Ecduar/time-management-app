const express = require('express');
const router = express.Router();
const HabitController = require('../controllers/HabitController');

// Definir rutas para habitos
router.get('/', HabitController.listHabits);
router.post('/', HabitController.addHabit);
router.get('/:id', HabitController.getHabit);
router.put('/:id', HabitController.updateHabit);
router.delete('/:id', HabitController.deleteHabit);

module.exports = router;