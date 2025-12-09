const express = require('express');
const fs = require('fs');
const path = require('path');
const useragent = require('useragent');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Define el nombre y la ruta del archivo de log
const LOG_FILE = path.join(__dirname, 'logs.txt');

// De que proxy confiar
app.set('trust proxy', '192.168.1.100');

// Endpoint
app.get('/', (req, res) => {
    // 1. Obtener la información cruda de la solicitud (headers)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const rawUserAgent = req.headers['user-agent'];
    const refererLink = req.headers.referer || 'Acceso Directo o Desconocido'; 
    const accessedHost = req.headers.host;
    
    // Nueva información: Idioma preferido por el navegador
    const acceptLanguage = req.headers['accept-language']; 

    // 2. Procesar el User-Agent para obtener detalles estructurados
    const agent = useragent.parse(rawUserAgent);

    // Extraer detalles de la librería useragent
    const browser = agent.toAgent(); // Ej: Chrome 142.0.0.0
    const os = agent.os.toString(); // Ej: Windows 10
    const device = agent.device.toString(); // Ej: Other, iPad, Samsung S21
    const isMobile = agent.isMobile;

    // 3. Crear la cadena de log con toda la información (incluyendo detalles del agente)
    const timestamp = new Date().toISOString();
    
    const logEntry = 
`[${timestamp}]
- IP: ${clientIp}
- Host: ${accessedHost}
- Referer: ${refererLink}
- Idioma Preferido: ${acceptLanguage}
-
- **DETALLE DEL DISPOSITIVO**
- Navegador: ${browser}
- S.O.: ${os}
- Dispositivo: ${device}
- Móvil/Tablet: ${isMobile ? 'Sí' : 'No'}
- User-Agent RAW: ${rawUserAgent}

`; // Doble salto de línea al final

    // 4. Escribir el log en el archivo
    try {
        fs.appendFileSync(LOG_FILE, logEntry);
        console.log(`✅ Log guardado en ${LOG_FILE}`);
    } catch (err) {
        console.error('❌ Error al escribir el log:', err);
    }

    // 5. Imprimir el log en la consola
    console.log('--- Nueva Solicitud Detallada ---');
    console.log(logEntry.trim());
    console.log('---------------------------------');

    // 6. Redireccionar al usuario
    res.status(301).redirect("https://pedropinedocobo.com");
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});