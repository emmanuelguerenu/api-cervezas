

const fs = require('fs');

module.exports = (req, res, next) => {
  // Formato: [Método] ruta - fecha/hora
  const line = `[${req.method}] ${req.originalUrl} - ${new Date().toLocaleString()}\n`;
  
  console.log(line.trim());               // muestra por consola
  fs.appendFileSync('logs.txt', line);    // guarda en logs.txt
  next();                                 // continúa al siguiente middleware
};







/*function logger(req, res, next){
    const fecha = new Date();
    const hora = fecha.toLocaleTimeString();
    const metodo = req.method;
    const ruta = req.originalUrl;

     console.log(`[${metodo}] ${ruta} - ${hora}`);


     next();
}

module.exports = logger*/