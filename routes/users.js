const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rutas para usuarios
router.get('/', UserController.listUsers);
router.get('/create', UserController.createUserForm);
router.post('/create', UserController.createUser);
router.get('/:id', UserController.getUser);
router.get('/:id/edit', UserController.editUserForm);
router.post('/:id/edit', UserController.updateUser);
router.post('/:id/delete', UserController.deleteUser);

module.exports = router;