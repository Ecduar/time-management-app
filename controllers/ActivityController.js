const db = require('../config/db');

class ActivityController {
    // 1. Listar todas las actividades
    static listActivities(req, res) {
        // Consulta SQL para obtener todas las actividades
        const query = `
            SELECT activities.id, activities.name, activities.description, categories.name AS category_name
            FROM activities
            LEFT JOIN categories ON activities.category_id = categories.id
        `;

        // Ejecutar la consulta
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching activities:', err);
                res.status(500).send('Error fetching activities');
                return;
            }
            // Renderizar la vista con los resultados
            res.render('activities/list', { activities: results });
        });
    }

    // 2. Mostrar formulario para crear una actividad
    static createActivityForm(req, res) {
        // Obtener todas las categorías para el formulario
        db.query('SELECT * FROM categories', (err, categories) => {
            if (err) {
                console.error('Error fetching categories:', err);
                res.status(500).send('Error fetching categories');
                return;
            }
            // Renderizar la vista del formulario con las categorías
            res.render('activities/create', { categories });
        });
    }

    // 3. Crear una nueva actividad
    static createActivity(req, res) {
        const { name, description, category_id } = req.body;

        // Validar que se proporcionen los datos necesarios
        if (!name || !description || !category_id) {
            res.status(400).send('Name, description, and category_id are required');
            return;
        }

        // Consulta SQL para insertar una nueva actividad
        const query = 'INSERT INTO activities (name, description, category_id) VALUES (?, ?, ?)';
        const values = [name, description, category_id];

        // Ejecutar la consulta
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error creating activity:', err);
                res.status(500).send('Error creating activity');
                return;
            }
            // Redirigir a la lista de actividades después de crear
            res.redirect('/activities');
        });
    }

    // 4. Mostrar detalles de una actividad
    static getActivity(req, res) {
        const activityId = req.params.id;

        // Consulta SQL para obtener una actividad específica con su categoría
        const query = `
            SELECT activities.id, activities.name, activities.description, categories.name AS category_name
            FROM activities
            LEFT JOIN categories ON activities.category_id = categories.id
            WHERE activities.id = ?
        `;

        // Ejecutar la consulta
        db.query(query, [activityId], (err, results) => {
            if (err || results.length === 0) {
                console.error('Error fetching activity:', err);
                res.status(404).send('Activity not found');
                return;
            }
            // Renderizar la vista de detalles con la actividad
            res.render('activities/detail', { activity: results[0] });
        });
    }

    // 5. Mostrar formulario para editar una actividad
    static editActivityForm(req, res) {
        const activityId = req.params.id;

        // Obtener la actividad específica
        db.query('SELECT * FROM activities WHERE id = ?', [activityId], (err, activityResults) => {
            if (err || activityResults.length === 0) {
                console.error('Error fetching activity:', err);
                res.status(404).send('Activity not found');
                return;
            }

            // Obtener todas las categorías para el formulario
            db.query('SELECT * FROM categories', (err, categoryResults) => {
                if (err) {
                    console.error('Error fetching categories:', err);
                    res.status(500).send('Error fetching categories');
                    return;
                }

                // Renderizar la vista de edición con la actividad y las categorías
                res.render('activities/edit', {
                    activity: activityResults[0],
                    categories: categoryResults
                });
            });
        });
    }

    // 6. Actualizar una actividad
    static updateActivity(req, res) {
        const activityId = req.params.id;
        const { name, description, category_id } = req.body;

        // Validar que se proporcionen los datos necesarios
        if (!name || !description || !category_id) {
            res.status(400).send('Name, description, and category_id are required');
            return;
        }

        // Consulta SQL para actualizar una actividad
        const query = 'UPDATE activities SET name = ?, description = ?, category_id = ? WHERE id = ?';
        const values = [name, description, category_id, activityId];

        // Ejecutar la consulta
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error updating activity:', err);
                res.status(500).send('Error updating activity');
                return;
            }
            // Redirigir a los detalles de la actividad después de actualizar
            res.redirect(`/activities/${activityId}`);
        });
    }

    // 7. Eliminar una actividad
    static deleteActivity(req, res) {
        const activityId = req.params.id;

        // Consulta SQL para eliminar una actividad
        const query = 'DELETE FROM activities WHERE id = ?';

        // Ejecutar la consulta
        db.query(query, [activityId], (err, results) => {
            if (err) {
                console.error('Error deleting activity:', err);
                res.status(500).send('Error deleting activity');
                return;
            }
            // Redirigir a la lista de actividades después de eliminar
            res.redirect('/activities');
        });
    }
}

module.exports = ActivityController;