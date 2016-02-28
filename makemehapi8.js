var Hapi = require('hapi');
var Path = require('path');
var Vision  = require('vision');
var fs = require('fs');
var rot13 = require('rot13-transform');

var server = new Hapi.Server();

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
    path: Path.join(__dirname, 'templates'),
    helpersPath: Path.join(__dirname, 'helpers')
});

server.route({
    path: '/',
    method: 'GET',
    handler: function (request, reply) {
        var rstream = fs.createReadStream('file.txt');
        reply(rstream.pipe(rot13()));
    }
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});