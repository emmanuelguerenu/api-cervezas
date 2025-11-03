const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const cervezasRouter = require('./vistas/cervezasVistas');
const { error } = require('console');

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);

app.use('/api/cervezas', cervezasRouter);

app.get('/', (req, res) => {
    res.json({mensaje: 'API de Cervezas servidor activo', rutas: ['/api/cervezas']});

});
app.use((req, res , next) => {
    res.status(404).json({ error: 'Ruta no encontrada'});
});

app.use((error, req, res , next) => {
    console.error('Error en el servidor:', error);
    res.status(error.status || 500).json({ error: error.mensaje || 'Error interno del servidor'});
});






app.listen(port,()=> {
    console.log('sevidor corriendo en el puerto ' + port);
})