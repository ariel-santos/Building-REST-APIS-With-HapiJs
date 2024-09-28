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
        path: '/api/companies',
        handler: CompanyController.create,
        options: {
            tags: ['api'],
            description: 'List of companies',
            notes: 'Returns a todo item by the id passed in the path',
            validate: {
                payload: schema
            }
        }
    },
    {
        method: 'GET',
        path: '/api/companies',
        handler: CompanyController.find,
        options: {
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/api/companies/{id}',
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
        path: '/api/companies/{id}',
        handler: CompanyController.update,
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
        method: 'DELETE',
        path: '/api/companies/{id}',
        handler: CompanyController.delete,
        options:{
            tags: ['api'],
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            }
        }
    }
];