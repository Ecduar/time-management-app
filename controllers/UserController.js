const db = require('../config/db');

class UserController {
    // Listar todos los usuarios
    static listUsers(req, res) {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                res.status(500).send('Error fetching users');
                return;
            }
            res.render('users/list', { users: results });
        });
    }

    // Mostrar formulario para crear un usuario
    static createUserForm(req, res) {
        res.render('users/create');
    }

    // Crear un nuevo usuario
    static createUser(req, res) {
        const { name, email } = req.body;
        db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
            if (err) {
                res.status(500).send('Error creating user');
                return;
            }
            res.redirect('/users');
        });
    }

    // Mostrar detalles de un usuario
    static getUser(req, res) {
        const userId = req.params.id;
        db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
            if (err || results.length === 0) {
                res.status(404).send('User not found');
                return;
            }
            res.render('users/detail', { user: results[0] });
        });
    }

    // Mostrar formulario para editar un usuario
    static editUserForm(req, res) {
        const userId = req.params.id;
        db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
            if (err || results.length === 0) {
                res.status(404).send('User not found');
                return;
            }
            res.render('users/edit', { user: results[0] });
        });
    }

    // Actualizar un usuario
    static updateUser(req, res) {
        const userId = req.params.id;
        const { name, email } = req.body;
        db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, results) => {
            if (err) {
                res.status(500).send('Error updating user');
                return;
            }
            res.redirect(`/users/${userId}`);
        });
    }

    // Eliminar un usuario
    static deleteUser(req, res) {
        const userId = req.params.id;
        db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) {
                res.status(500).send('Error deleting user');
                return;
            }
            res.redirect('/users');
        });
    }
}

module.exports = UserController;