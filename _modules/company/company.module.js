const companyRoutes = require('./company.routes');
const CompanyModule = {
    name: 'CompanyModule',
    register: function (server, options, next) {
        server.route(companyRoutes)
    }
}

CompanyModule.register.attributes = {

}

module.exports = CompanyModule;