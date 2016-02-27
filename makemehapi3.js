const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Inert, function(err) {
    if (err) {
        throw err;
    }
});

server.route({
    path: '/',
    method: 'GET',
    handler: {
        file: "index.html"
    }
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});