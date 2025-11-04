const { error } = require('console');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/cervezas.json');

function idExiste(id) {
  const datos = fs.readFileSync(dataPath, 'utf-8');
  const cervezas = JSON.parse(datos);
  return cervezas.some(c => c.id === id);

}

function validateCerveza(req, res, next) {
  const cerveza = req.body;
  const campObligatorios = ['marca', 'tipo'];





  // validar campos obligatorios 
  for (const campo of campObligatorios) {
    if (cerveza[campo] === undefined || cerveza[campo] === null || cerveza[campo] === '') {
      return res.status(400).json({ error: `El campo '${campo}' es obligatorio` });
    }
  }


  // Si es PUT, el ID es obligatorio y debe existir
  if (req.method === 'PUT') {
    if (typeof cerveza.id !== 'number') {
      return res.status(400).json({ error: "El 'id' debe ser un número." });
    }
    if (!idExiste(cerveza.id)) {
      return res.status(400).json({ error: `El ID ${cerveza.id} no existe.` });
    }
  }

  // Si es POST, no debe incluir ID
  if (req.method === 'POST' && cerveza.id !== undefined) {
    return res.status(400).json({ error: "No envíes el 'id' al crear una cerveza." });
  }



  ///validar marca
  if (cerveza.marca !== undefined && typeof cerveza.marca !== 'string') {
    return res.status(400).json({ error: "El campo 'marca' debe ser texto" });
  }
  /// validar tipo
  if (cerveza.tipo !== undefined && typeof cerveza.tipo !== 'string') {
    return res.status(400).json({ error: "El campo 'tipo' debe ser texto" });
  }
  /// validar color
  if (cerveza.color !== undefined && typeof cerveza.color !== 'string') {
    return res.status(400).json({ error: "el campo 'color' debe ser texto" });
  }


  /// validar grado de alcohol
  if (cerveza.grado_alcohol !== undefined && (typeof cerveza.grado_alcohol !== 'number' || cerveza.grado_alcohol < 0)) {
    return res.status(400).json({ error: "El 'grado_alcohol' debe ser un numero positivo" });
  }

  // validar origen
  if (cerveza.origen !== undefined && typeof cerveza.origen !== 'string') {
    return res.status(400).json({ error: "El campo 'origen' debe ser texto" });
  }
  /// validar es_artesanal
  if (cerveza.es_artesanal !== undefined && typeof cerveza.es_artesanal !== 'boolean') {
    return res.status(400).json({ error: "El campo 'es_artesanal' debe ser true o false." });
  }

  ////validar ingredientes
  if (cerveza.ingredientes !== undefined && !Array.isArray(cerveza.ingredientes)) {
    return res.status(400).json({ error: "El campo 'ingredientes' debe ser un array (lista)." });
  }

  /// validar grado de amargor
  if (cerveza.grado_amargor !== undefined && typeof cerveza.grado_amargor !== 'number') {
    return res.status(400).json({ error: "El campo 'grado_amargor' debe ser un numero." });
  }


  next();
}

module.exports = validateCerveza;