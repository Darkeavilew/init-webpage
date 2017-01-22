'use strict';

const Web = require('node-static');
const webPort = 8080;
const path = new Web.Server('./web');

require('http').createServer(function(request, response) {
    request.addListener('end', function () {
        path.serve(request, response, function (err, result) {
            if (err) {
                console.error("WEB ERROR!: " + request.url + " - " + err.message);
 
                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(webPort);