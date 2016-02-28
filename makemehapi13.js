var Hapi = require('hapi');
var Joi = require('joi');
var Basic = require('hapi-auth-basic');
var Bcrypt = require('bcrypt');


var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

var users = {

    username: 'hapi',
    password: 'auth'
};

var validate = function (request, username, password, callback) {
    var user = users;


    if (username === user.username && password === user.password) {
        console.log('logged in!');
        callback(null, true, {username: username, password: password});
    } else {
        // need this else clause otherwise callback never fires for when user fails to authenticate
        callback(null, false, {username: username, password: password});
    };
};


server.register(Basic, (err) => {

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    server.route({ 
        method: 'GET', 
        path:'/', 
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello' + request.auth.credentials.name);
            }
        } 
    })
});


server.start(function() {
    console.log('Server running at:', server.info.uri);
});