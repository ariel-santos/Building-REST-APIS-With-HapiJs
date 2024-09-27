'use strict'
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const mongoDbUri = 'mongodb://localhost:27017/hapi_db';

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

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            return {
                id: 1,
                nome: 'nome'
            };
        }
    });

    const Company = require('./_models/company.model');
    server.route({
        method: 'POST',
        path: '/api/companies',
        handler: async (request, h) => {
            if(!request.payload.name) {
                return h.response({
                    code: 1, 
                    err: 'name is required'
                }).code(550);
            }

            const company = new Company({
                name: request.payload.name,
                city: request.payload.city,
                address: request.payload.address
            });

            // await company.save((err, saved) => {
            //     if (err) {
            //         return h.response(err).code(550);
            //     }
            //     return h.response(saved);
            //     return reply(saved.id);
            // });
            const saved = await company.save();
            return h.response(saved);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();