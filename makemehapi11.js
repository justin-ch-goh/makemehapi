var Hapi = require('hapi');
var Path = require('path');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/upload',
    method: 'POST',    
    handler: function (request, reply) {
        var body = {
            description: '',
            file: {
                data: '',
                filename: '',
                headers: ''
            }
        };

        body.description = request.payload.description;

        //https://bl.ocks.org/joyrexus/0c6bd5135d7edeba7b87 
        //multipart form/file uploading demo for the filename/headers syntax
        //access using .file.hapi.filename or .file.hapi.headers
        
        request.payload.file.on('data', function (data) {
            body.file.data += data;
        });

        request.payload.file.on('end', function (data) {

            body.file.filename = request.payload.file.hapi.filename,
            body.file.headers = request.payload.file.hapi.headers

            console.log(body);
            reply(JSON.stringify(body));
        });

    },
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});