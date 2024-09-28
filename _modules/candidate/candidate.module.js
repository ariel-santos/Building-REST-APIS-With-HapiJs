const candidateRoutes = require('./candidate.routes');
const CandidateModule = {
    name: 'CandidateModule',
    register: function (server, options, next) {
        server.route(candidateRoutes)
        next;
    }
}

module.exports = CandidateModule;