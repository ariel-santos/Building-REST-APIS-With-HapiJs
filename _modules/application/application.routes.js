const ApplicationController = require('./application.controller');
const Joi = require('joi');

module.exports = [
    {
        path: '/applications',
        method: 'GET',
        handler: ApplicationController.find,
        options: {
            tags: ['api', 'Applications'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required()
                }),
                options: {
                    allowUnknown: true
                }
            }
        }
    },
    {
        path: '/applications',
        method: 'POST',
        handler: ApplicationController.create,
        options: {
            tags: ['api', 'Applications'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                payload: Joi.object().keys({
                    hired: Joi.boolean().optional(),
                    job: Joi.string().required(),
                    candidate: Joi.string().required(),
                })
            }
        }
    }
]