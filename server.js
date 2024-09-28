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
    Company.events.on('error', err => console.log('Company', err.message));
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

            const saved = await company.save();
            return h.response(saved);
        }
    });

    server.route({
        method: 'GET',
        path: '/api/companies',
        handler: async (req, h) => {
            // {_id: 'Not a valid ObjectId' }
            const list = await Company.find()
            .catch((err) => {
                console.log('ERROR', 'GET', '/api/companies');
                console.log(err);
                return h.response({
                    erro: true
                }).code(550);
            });
            return h.response(list);
        }
    });
    server.route({
        method: 'GET',
        path: '/api/companies/{id}',
        handler: async (req, h) => {
            if (!req.params.id) {
                return h.response({err: true, msg: 'id is required'}).code(404);
            }

            const company = await Company.findById(req.params.id)
            .catch((err) => {
                console.log('ERROR', 'GET', '/api/companies/{id}');
                console.log(err);
                return h.response({
                    erro: true
                }).code(550);
            });
            return h.response(company);
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/companies/{id}',
        handler: async (req, h) => {
            if (!req.params.id) {
                return h.response({err: true, msg: 'id is required'}).code(404);
            }
            let attr = {};
            if (!req.payload){
                return h.response({ err: true, msg: 'payload vazio'});
            }
            if (req.payload.name) {
                attr.name = req.payload.name;
            }
            if (req.payload.city) {
                attr.city = req.payload.city;
            }
            if (req.payload.address) {
                attr.address = req.payload.address;
            }

            const company = await Company.findByIdAndUpdate(req.params.id, attr, {returnDocument: 'after'})
            .catch((err) => {
                console.log('ERROR', 'PUT', '/api/companies');
                console.log(err);
                return h.response({
                    erro: true
                }).code(550);
            });
            return h.response(company);
        }
    });
    server.route({
        method: 'DELETE',
        path: '/api/companies/{id}',
        handler: async (req, h) => {
            if (!req.params.id) {
                h.response({
                    err: true,
                    msg: 'id is required'
                }).code(404);
            }

            const companies = await Company.findByIdAndDelete(req.params.id)
            .catch((err) => {
                console.log('ERROR', 'DELETE', '/api/companies/{id}');
                console.log(err);
                return h.response({
                    erro: true
                }).code(550);
            });
            return h.response({
                err: false,
                msg: 'Deleted ' + req.params.id
            });
        }
    })
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();