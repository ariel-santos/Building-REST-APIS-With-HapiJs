const applicationRoutes = require('./application.routes');

const ApplicationModule = {
    name: 'ApplicationModule',
    register: (server, options, next) => {
        server.route(applicationRoutes);
        next;
    }
};

module.exports = ApplicationModule;