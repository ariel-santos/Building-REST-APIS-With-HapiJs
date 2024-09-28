'use strict'
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const mongoDbUri = 'mongodb://localhost:27017/hapi_db';
const companyRoutes = require('./_controllers/company.routes');

const init = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost'
    });

    mongoose.connect(mongoDbUri, {});
    mongoose.connection.on('connected', () => {
        console.log('app is conected', mongoDbUri);
    });
    mongoose.connection.on('error', err => {
        console.log('Error', err);
    });

    server.route(companyRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();