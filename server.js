'use strict'
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require('./package');
const MongoosePlugin = require('./_plugins/mongoose.plugin');

// const companyRoutes = require('./_controllers/company.routes');
const CompanyModule = require('./_modules/company/company.module');
const ApplicationModule = require('./_modules/application/application.module');

const init = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost'
    });

    // ROUTES
    // server.route(companyRoutes);

    // PLUGINS
    await server.register([
        {
            plugin: MongoosePlugin,
            options: {
                mongoDbUri: 'mongodb://localhost:27017/hapi_db'
            }
        },
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'Test API Documentation',
                    version: Pack.version,
                },
            }
        },
        CompanyModule,
        ApplicationModule
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();