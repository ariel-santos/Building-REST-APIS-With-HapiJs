const JobController = require('./job.controller');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/jobs',
        handler: JobController.find,
        options: {
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/jobs',
        handler: JobController.create,
        options: {
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                payload: Joi.object().keys({
                    title: Joi.string().required(),
                    company: Joi.string().required()
                })
            }
        }
    }
];