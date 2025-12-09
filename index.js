// 1. Importaciones
const functions = require('firebase-functions');
const express = require('express');
require("dotenv").config(); 
const cors = require('cors');

// 2. Inicializar la aplicación
const app = express();

// 3. Definir el puerto
const PORT = process.env.PORT || 3000; 

// condifurar el cors
app.use(cors({
    origin: 'https://pedropinedocobo.com'
}));

// 4. Definir una RUTA (Endpoint)
// Esto se activa cuando alguien hace una petición GET a http://localhost:3000/
app.get('/', (req, res) => {
  res.status(200).json({message: '¡Hola! Soy tu servidor Backend con Node y Express.'}); 
});

// 5. Iniciar el Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Exporta tu aplicación Express como una Cloud Function
// Esto hace que Firebase la trate como una API que maneja rutas
exports.api = functions.https.onRequest(app);
