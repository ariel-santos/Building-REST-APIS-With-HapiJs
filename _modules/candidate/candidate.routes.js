const CandidateController = require('./candidate.controller');

module.exports = [
    {
        method: 'GET',
        path: '/api/candidates',
        handler: CandidateController.find,
        options: {
            tags: ['api']
        }
    }
];