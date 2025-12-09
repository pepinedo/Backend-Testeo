const express = require('express');
const fs = require('fs'); // <--- Importamos el módulo File System
const path = require('path'); // Recomendado para manejar rutas de archivos
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Define el nombre y la ruta del archivo de log
const LOG_FILE = path.join(__dirname, 'logs.txt'); 

//Endpoint
app.get('/', (req, res) => {
    // 1. Obtener la información del cliente
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const refererLink = req.headers.referer || 'Acceso Directo o Desconocido'; 
    const accessedHost = req.headers.host; // El dominio que se está visitando

    // Creamos la cadena de log con un formato timestamp
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}]\n- IP: ${clientIp}\n- Host: ${accessedHost}\n- Referer: ${refererLink}\n- User-Agent: ${userAgent}\n\n`;

    // 2. Escribir el log en el archivo
    try {
        // 'appendFileSync' agrega contenido al final del archivo.
        fs.appendFileSync(LOG_FILE, logEntry);
        console.log(`✅ Log guardado en ${LOG_FILE}`);
    } catch (err) {
        console.error('❌ Error al escribir el log:', err);
    }

    // 3. Imprimir el log en la consola (adicional al archivo)
    console.log('--- Nueva Solicitud ---');
    console.log(logEntry.trim());
    console.log('-----------------------');

    // 4. Redireccionar al usuario
    res.status(301).redirect("https://pedropinedocobo.com");
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});