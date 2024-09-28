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
        config: {
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
        handler: CompanyController.findOne
    },
    {
        method: 'PUT',
        path: '/api/companies/{id}',
        handler: CompanyController.update
    },
    {
        method: 'DELETE',
        path: '/api/companies/{id}',
        handler: CompanyController.delete
    }
];