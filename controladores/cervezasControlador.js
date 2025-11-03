const modelo = require('../modelos/cervezasModelos');

// obtrner todas las cervezas
function obtenerCervezas(req, res) {
    try {
        const cervezas = modelo.obtenerCervezas();
        res.json(cervezas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las Cervezas' });

    }
}

//obtener cerveza por ID 
function obtenerCervezasPorId(req, res) {
    try {
        const id = parseInt(req.params.id);
        const cerveza = modelo.obtenerCervezasPorId(id);


        if (!cerveza) {
            return res.status(404).json({ error: `No se encontro una cerveza con ID ${id}` })
        }
        res.json(cerveza);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la cerveza' });
    }
}

///filtrar por query
function filtrarPorQuery(req, res) {
    try {
        const filtros = req.query;
        const resultados = modelo.filtrarPorQuery(filtros);

        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontro cervezas con esos filtros' });
        }
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar cervezas' });

    }

}


//// agregar una nueva cerveza
function agregarCerveza(req, res) {
    try {
    const nuevaCerveza = req.body;

    // El modelo se encarga de defaults y validaciones de tipo
    const { cerveza, camposPorDefecto } = modelo.cervezaCreada(nuevaCerveza);

    res.status(201).json({
      mensaje: 'Cerveza creada correctamente',
      cerveza,
      camposCompletados: camposPorDefecto
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cerveza' });
  }
}


/// actualizar una cerveza existente
function actualizarCerveza(req, res) {
    try {
        const id = parseInt(req.params.id);
        const datosActualizados = req.body;
        const actuliCerveza = modelo.actualizarCerveza(id, datosActualizados);
        if (!actuliCerveza) {
            return res.status(404).json({ error: `No se encontro la cerveza con ID ${id}` });

        }
        res.json({ mensaje: ' cerveza actualizada correctamente', actuliCerveza });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cerveza' });

    }
}


/// eliminar una cerveza por ID

function eliminarCerveza(req, res) {
    try {
        const id = parseInt(req.params.id);
        const cervezaEliminada = modelo.eliminarCerveza(id);

        if (!cervezaEliminada) {
            return res.status(404).json({ mensaje: `No se encontro la cerveza con ID ${id}`});   
        }

        res.json({ mensaje: 'Cerveza eliminada correctamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la cerveza'});

    }
    }
    
   


module.exports = { obtenerCervezas, obtenerCervezasPorId, filtrarPorQuery, agregarCerveza, actualizarCerveza, eliminarCerveza };