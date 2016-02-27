var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var Vision  = require('vision');

var server = new Hapi.Server();

server.register(Inert, function (err) {
    if (err) {
        throw err;
    }
});

server.register(Vision, function (err) {
    if (err) {
        throw err;
    }
});

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates')
});

server.route({
    path: '/',
    method: 'GET',
    handler: {
        view: 'index.html'
        //request.query.name
    }
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});