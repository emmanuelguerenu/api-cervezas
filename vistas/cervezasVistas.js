const express = require('express');
const router = express.Router();


const Controlador = require('../controladores/cervezasControlador');
const validateCerveza = require('../middlewares/validateCerveza');
const validateCervezaPut = require('../middlewares/validateCervezaPut');

//   Obtener todas las cervezas
router.get('/todas', Controlador.obtenerCervezas);

//obtener estadisticas de cervezas
router.get('/estadisticas', Controlador.obtenerEstadisticas);

//  Obtener una cerveza por ID
router.get('/:id', Controlador.obtenerCervezasPorId);

//  Filtrar por query (ejemplo: /api/cervezas/filtro?tipo=Lager)
router.get('/filtro/buscar', Controlador.filtrarPorQuery);


//  Crear una nueva cerveza
router.post('/', validateCerveza, Controlador.agregarCerveza);

//  Actualizar una cerveza
router.put('/:id', validateCervezaPut, Controlador.actualizarCerveza);

//  Eliminar una cerveza
router.delete('/:id', Controlador.eliminarCerveza);


module.exports = router;