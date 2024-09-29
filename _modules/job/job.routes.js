const JobController = require('./job.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/api/jobs',
        handler: JobController.find,
        options: {
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/api/jobs',
        handler: JobController.create,
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object().keys({
                    title: Joi.string().required(),
                    company: Joi.string().required()
                })
            }
        }
    }
];