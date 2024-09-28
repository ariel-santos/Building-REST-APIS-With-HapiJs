const CompanyController = require('./company.controller');

module.exports = [
    {
        method: 'POST',
        path: '/api/companies',
        handler: CompanyController.create
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