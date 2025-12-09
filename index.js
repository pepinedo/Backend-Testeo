// 1. Importaciones
const express = require('express');
require("dotenv").config(); 
const cors = require('cors');

// 2. Inicializar la aplicación
const app = express();

// 3. Definir el puerto
const PORT = process.env.PORT || 3000; 

// configurar el cors
app.use(cors({
    origin: 'https://pedropinedocobo.com'
}));

// 4. Definir una RUTA (Endpoint)
// Esto se activa cuando alguien hace una petición GET a http://localhost:3000/
app.get('/', (req, res) => {
    // 1. Obtener la IP del cliente
    // Se recomienda usar 'x-forwarded-for' si estás detrás de un proxy/load balancer
    // y caer a 'req.socket.remoteAddress' si no lo estás.
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // 2. Obtener el User-Agent
    const userAgent = req.headers['user-agent'];

    // 3. Desde que enlace ha entrado
    const enlace = req.headers.host



    // --- Impresión de la información ---
    console.log('--- Nueva Solicitud ---');
    console.log(`👤 IP del Cliente: ${clientIp}`);
    console.log(`🌐 User-Agent: ${userAgent}`);
    console.log(`🌎 Enlace: ${enlace}`);
    console.log('-----------------------');

    res.status(301).redirect("https://pedropinedocobo.com")
});

// 5. Iniciar el Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
