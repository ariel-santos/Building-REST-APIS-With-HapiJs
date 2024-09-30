const Joi = require('joi');
const CompanyController = require('./company.controller');
const schema = Joi.object().keys({
    name: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().optional()
});

module.exports = [
    {
        method: 'POST',
        path: '/companies',
        handler: CompanyController.create,
        options: {
            tags: ['api'],
            description: 'Create company',
            notes: 'Returns a todo item by the id passed in the path',
            validate: {
                payload: schema,
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        method: 'GET',
        path: '/companies',
        handler: CompanyController.find,
        options: {
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/companies/{id}',
        handler: CompanyController.findOne,
        options:{
            tags: ['api'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/companies/{id}',
        handler: CompanyController.update,
        options:{
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/companies/{id}',
        handler: CompanyController.delete,
        options:{
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            }
        }
    }
];