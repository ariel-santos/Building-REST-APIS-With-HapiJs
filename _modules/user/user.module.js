const userRoutes = require('./user.routes');

const UserModule = {
    name: 'UserModule',
    register: function(server, options, next) {
        server.route(userRoutes);
        next;
    }
}

module.exports = UserModule;