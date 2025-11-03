const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/cervezas.json');

function idExiste(id) {
  const datos = fs.readFileSync(dataPath, 'utf-8');
  const cervezas = JSON.parse(datos);
  return cervezas.some(c => c.id === id);
}

function validateCervezaPut(req, res, next) {
  const cerveza = req.body;

  // 1. Verificar que el ID del parámetro exista
  const id = parseInt(req.params.id);
  if (!idExiste(id)) {
    return res.status(404).json({ error: `No se encontró la cerveza con ID ${id}` });
  }

  // 2. Permitir solo campos válidos (opcional pero útil)
  const permitidos = [
    'marca', 'tipo', 'color', 'grado_alcohol', 'origen',
    'es_artesanal', 'ingredientes', 'grado_amargor'
  ];

  for (const key of Object.keys(cerveza)) {
    if (!permitidos.includes(key)) {
      return res.status(400).json({ error: `Campo no permitido: ${key}` });
    }
  }

  // 3. Validar tipos solo si el campo fue enviado
  if (cerveza.marca && typeof cerveza.marca !== 'string') {
    return res.status(400).json({ error: "'marca' debe ser texto" });
  }

  if (cerveza.tipo && typeof cerveza.tipo !== 'string') {
    return res.status(400).json({ error: "'tipo' debe ser texto" });
  }

  if (cerveza.color && typeof cerveza.color !== 'string') {
    return res.status(400).json({ error: "'color' debe ser texto" });
  }

  if (cerveza.origen && typeof cerveza.origen !== 'string') {
    return res.status(400).json({ error: "'origen' debe ser texto" });
  }

  if (cerveza.grado_alcohol && (typeof cerveza.grado_alcohol !== 'number' || cerveza.grado_alcohol < 0)) {
    return res.status(400).json({ error: "'grado_alcohol' debe ser un número positivo" });
  }

  if (cerveza.es_artesanal && typeof cerveza.es_artesanal !== 'boolean') {
    return res.status(400).json({ error: "'es_artesanal' debe ser true o false" });
  }

  if (cerveza.ingredientes && !Array.isArray(cerveza.ingredientes)) {
    return res.status(400).json({ error: "'ingredientes' debe ser un array" });
  }
  
  if (cerveza.grado_amargor && typeof cerveza.grado_amargor !== 'number') {
    return res.status(400).json({ error: "'grado_amargor' debe ser un número" });
  }

  next();
}

module.exports = validateCervezaPut;