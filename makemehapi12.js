var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/set-cookie',
    method: 'GET',    
    handler: function (request, reply) {
        console.log(request.state.session);
        reply('success').state('session', { key: 'makemehapi' });
    },
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
});

server.route({
    path: '/check-cookie',
    method: 'GET',
    handler: function (request, reply) {
        var session = request.state.session;
        var result;
        if (session) {
            result = { user: 'hapi' };
        } else {
            result = Boom.unauthorized('Missing authentication');
        }

        reply(result);
    }
})

server.state('session', {

    path: '/',
    domain: 'localhost',
    encoding: 'base64json',
    ttl: 10
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});