const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Definir rutas para usuarios
router.get('/', UserController.listUsers);
router.post('/', UserController.addUser);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;