'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

http.createServer(function (request, response) {
    
    let filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './web/index.html';
    }

    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
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