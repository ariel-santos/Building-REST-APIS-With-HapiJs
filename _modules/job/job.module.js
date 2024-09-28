const jobRoutes = require('./job.routes');
const JobModule = {
    name: 'JobModule',
    register: function (server, options, next) {
        server.route(jobRoutes)
        next;
    }
}

module.exports = JobModule;