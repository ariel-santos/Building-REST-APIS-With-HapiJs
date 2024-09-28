const JobController = require('./job.controller');

module.exports = [
    {
        method: 'GET',
        path: '/api/job',
        handler: JobController.find,
        options: {
            tags: ['api']
        }
    }
];