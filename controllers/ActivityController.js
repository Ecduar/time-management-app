const db = require('../config/db');

class ActivityController {
    // Listar todas las actividades
    static listActivities(req, res) {
        db.query('SELECT * FROM activities', (err, results) => {
            if (err) {
                res.status(500).send('Error fetching activities');
                return;
            }
            res.render('activities/list', { activities: results });
        });
    }

    // Mostrar formulario para crear una actividad
    static createActivityForm(req, res) {
        res.render('activities/create');
    }

    // Crear una nueva actividad
    static createActivity(req, res) {
        const { name, description, category_id } = req.body;
        db.query('INSERT INTO activities (name, description, category_id) VALUES (?, ?, ?)', [name, description, category_id], (err, results) => {
            if (err) {
                res.status(500).send('Error creating activity');
                return;
            }
            res.redirect('/activities');
        });
    }

    // Mostrar detalles de una actividad
    static getActivity(req, res) {
        const activityId = req.params.id;
        db.query('SELECT * FROM activities WHERE id = ?', [activityId], (err, results) => {
            if (err || results.length === 0) {
                res.status(404).send('Activity not found');
                return;
            }
            res.render('activities/detail', { activity: results[0] });
        });
    }

    // Mostrar formulario para editar una actividad
    static editActivityForm(req, res) {
        const activityId = req.params.id;
        db.query('SELECT * FROM activities WHERE id = ?', [activityId], (err, results) => {
            if (err || results.length === 0) {
                res.status(404).send('Activity not found');
                return;
            }
            res.render('activities/edit', { activity: results[0] });
        });
    }

    // Actualizar una actividad
    static updateActivity(req, res) {
        const activityId = req.params.id;
        const { name, description, category_id } = req.body;
        db.query('UPDATE activities SET name = ?, description = ?, category_id = ? WHERE id = ?', [name, description, category_id, activityId], (err, results) => {
            if (err) {
                res.status(500).send('Error updating activity');
                return;
            }
            res.redirect(`/activities/${activityId}`);
        });
    }

    // Eliminar una actividad
    static deleteActivity(req, res) {
        const activityId = req.params.id;
        db.query('DELETE FROM activities WHERE id = ?', [activityId], (err, results) => {
            if (err) {
                res.status(500).send('Error deleting activity');
                return;
            }
            res.redirect('/activities');
        });
    }
}

module.exports = ActivityController;