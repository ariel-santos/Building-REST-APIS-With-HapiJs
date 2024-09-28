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
            validate: {
                payload: schema
            }
        }
    },
    {
        method: 'GET',
        path: '/api/companies',
        handler: CompanyController.find
    },
    {
        method: 'GET',
        path: '/api/companies/{id}',
        handler: CompanyController.findOne,
        options:{
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
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            }
        }
    }
];