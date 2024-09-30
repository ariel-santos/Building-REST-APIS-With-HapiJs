const Joi = require('joi');
const CandidateController = require('./candidate.controller');

module.exports = [
    {
        method: 'GET',
        path: '/candidates',
        handler: CandidateController.find,
        options: {
            tags: ['api', 'Candidates']
        }
    },
    {
        method: 'POST',
        path: '/candidates',
        handler: CandidateController.create,
        options: {
            tags: ['api', 'Candidates'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
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