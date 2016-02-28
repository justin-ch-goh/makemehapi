var Hapi = require('hapi');
var Path = require('path');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/login',
    method: 'POST',
    handler: function (request, reply) {
        reply('login successful');
    },
    config: {
        validate: {
            params: {
                breed: Joi.string()
            }
        }
    }
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});