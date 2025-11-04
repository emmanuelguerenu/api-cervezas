const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/cervezas.json');

const DEFAULTS = {
  marca: 'Sin marca',
  tipo: 'Lager',
  color: 'Rubia',
  grado_alcohol: 4.5,
  origen: 'Desconocido',
  es_artesanal: false,
  ingredientes: ['Agua', 'Malta', 'Lúpulo'],
  grado_amargor: 15
};

// funcion para aplicar valores por defecto
function aplicarDefaults(cerveza) {
  const aplicados = [];            // <-- campos que completamos
  for (const [key, valor] of Object.entries(DEFAULTS)) {
    if (cerveza[key] === undefined || cerveza[key] === null || cerveza[key] === '') {
      cerveza[key] = valor;
      aplicados.push(key);
    }
  }
  return aplicados;                // devolvemos lista de campos tocados
}


// Función para obtener todas las cervezas
function obtenerCervezas() {
    const datos = fs.readFileSync(dataPath, 'utf-8');
    const cervezas = JSON.parse(datos);
    return cervezas;

}
// funcion para obtener cerveza por ID
function obtenerCervezasPorId(id) {
    const datos = fs.readFileSync(dataPath, 'utf-8');
    const cervezas = JSON.parse(datos);

    const cerveza = cervezas.find(c => c.id === id);
    return cerveza;
}
/// funcion para filtrar por query
function filtrarPorQuery(filtros) {
    const datos = fs.readFileSync(dataPath, 'utf-8');
    let cervezas = JSON.parse(datos);

    for (let clave in filtros) {
        cervezas = cervezas.filter(c => {
            const valorCerveza = c[clave];

            if (Array.isArray(valorCerveza)) {
                return valorCerveza.some(v => v.toLowerCase().includes(filtros[clave].toLowerCase().trim()));
            }
            return String(valorCerveza).toLowerCase() === filtros[clave].toLowerCase().trim();

        });
    }
    return cervezas;
}
// funcion para obtener estadisticas de las cervezas
function obtenerEstadisticas() {
  const datos = fs.readFileSync(dataPath, 'utf-8');
  const cervezas = JSON.parse(datos);

  const total = cervezas.length;
  const promedioAlcohol = total
    ? cervezas.reduce((sum, c) => sum + c.grado_alcohol, 0) / total
    : 0;

  const porTipo = {};
  cervezas.forEach(c => {
    porTipo[c.tipo] = (porTipo[c.tipo] || 0) + 1;
  });

  const artesanales = cervezas.filter(c => c.es_artesanal).length;
  const noArtesanales = total - artesanales;

  return {
    total,
    promedioAlcohol: Number(promedioAlcohol.toFixed(2)),
    porTipo,
    artesanales,
    noArtesanales
  };
}



// funcion para agregar una nueva cerveza
function cervezaCreada(nuevaCerveza) {
    const datos = fs.readFileSync(dataPath, 'utf-8');
    const cervezas = JSON.parse(datos);

     // aplicar valores por defecto
    const camposPorDefecto = aplicarDefaults(nuevaCerveza);

    // Generar nuevo ID automáticamente
    nuevaCerveza.id = generarNuevoId();
    
     //ordenar la nueva cerveza
    const cervezaOrdenada = ordenarCerveza(nuevaCerveza);

    cervezas.push(cervezaOrdenada);
    fs.writeFileSync(dataPath, JSON.stringify(cervezas, null, 2));
    return{ cerveza: cervezaOrdenada, camposPorDefecto};
}

/// funcion para actualizar una cerveza existente
function actualizarCerveza(id, datosActualizados) {
    const datos = fs.readFileSync(dataPath, 'utf-8');
    const cervezas = JSON.parse(datos);
    const indice = cervezas.findIndex(c => c.id === id);

    if (indice === -1) return null;

    cervezas[indice] = { ...cervezas[indice], ...datosActualizados };

    fs.writeFileSync(dataPath, JSON.stringify(cervezas, null, 2));
    return cervezas[indice];

}

// funcion para eliminar una cerveza por id
function eliminarCerveza(id) {
    const datos = fs.readFileSync(dataPath, 'utf-8');
    const cervezas = JSON.parse(datos);

    const nuevaLista = cervezas.filter(c => c.id !== Number(id));
    if (cervezas.length === nuevaLista.length) return false;

    fs.writeFileSync(dataPath, JSON.stringify(nuevaLista, null, 2));
    return true;
}

// funcion para generar un nueva ID
function generarNuevoId() {
    const datos = fs.readFileSync(dataPath, 'utf-8');
    const cervezas = JSON.parse(datos);
    const maxId = cervezas.reduce((max, c) => (c.id > max ? c.id : max), 0);
    return maxId + 1;
}


function ordenarCerveza(cerveza) {
    return {
        id: cerveza.id,
        marca: cerveza.marca,
        tipo: cerveza.tipo,
        color: cerveza.color,
        grado_alcohol: cerveza.grado_alcohol,
        origen: cerveza.origen,
        es_artesanal: cerveza.es_artesanal,
        ingredientes: cerveza.ingredientes,
        grado_amargor: cerveza.grado_amargor
    };
}




module.exports = {
    obtenerCervezas,
    obtenerCervezasPorId,
    filtrarPorQuery,
    cervezaCreada,
    actualizarCerveza,
    eliminarCerveza,
    obtenerEstadisticas
};

