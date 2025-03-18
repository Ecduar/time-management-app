const express = require('express');
const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
    res.render('index', { title: 'Gestión del Tiempo' });
});

module.exports = router;