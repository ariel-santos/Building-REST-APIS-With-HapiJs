const ApplicationController = require('./application.controller');
const Joi = require('joi');

module.exports = [
    {
        path: '/api/applications',
        method: 'GET',
        handler: ApplicationController.find,
        options: {
            tags: ['api']
        }
    },
    {
        path: '/api/applications',
        method: 'POST',
        handler: ApplicationController.create,
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object().keys({
                    hired: Joi.boolean().optional(),
                    job: Joi.string().required(),
                    candidate: Joi.string().required(),
                })
            }
        }
    }
]