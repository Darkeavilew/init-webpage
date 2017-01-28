/*--
    Archivo Principal
        Este archivo permite la ejecucion 
        de la pagina por medio de un 
        protocolo 'http'.

        Directorio de archivos a mostrar: '/web/'
--*/

'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

let config = {
    maintenance: false,
};

http.createServer(function (request, response) {
    
    let filePath = '.' + request.url;
    if (filePath == './') {
        if (config.maintenance === true) {
            filePath = './web/maintenance.html';
        } else {
            filePath = './web/index.html';
        }
    }

    // Tipos y extension de archivos
    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': // Script (Javascript)
            contentType = 'text/javascript';
            break;
        case '.css': //Estilo (CSS)
            contentType = 'text/css';
            break;
        case '.json': // Datos modificables
            contentType = 'application/json';
            break;
        case '.png': // Extension de imagen
            contentType = 'image/png';
            break;      
        case '.jpg': // Extension de imagen
            contentType = 'image/jpg';
            break;
        case '.wav': // Video/Audio
            contentType = 'audio/wav';
            break;
    }
    
    // Errores
    // ----------
    // El siguiente codigo envia el codigo de error
    // a la direccion por la cual se intenta acceder.

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){// Archivo no encontrado
                fs.readFile('./web/404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else { // Otros errores
                response.writeHead(500);
                response.end('Ocurrio un error al intentar cargar la pagina!\n ' + error);
                response.end(); 
            }
        }
        else { // Flujo normal de la pagina
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
    
}).listen(8080);

console.log(
    '\n',
    '-------------- Init WebPage --------------'
);