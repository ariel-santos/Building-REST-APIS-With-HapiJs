const Joi = require('joi');
const CandidateController = require('./candidate.controller');

module.exports = [
    {
        method: 'GET',
        path: '/api/candidates',
        handler: CandidateController.find,
        options: {
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/api/candidates',
        handler: CandidateController.create,
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object().keys({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().required(),
                    company: Joi.string().required(),
                })
            }
        }
    }
];