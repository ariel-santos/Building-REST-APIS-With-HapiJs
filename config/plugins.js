
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require('./../package');
const MongoosePlugin = require('./../_plugins/mongoose.plugin');
const CompanyModule = require('./../_modules/company/company.module');
const ApplicationModule = require('./../_modules/application/application.module');
const CandidateModule = require('./../_modules/candidate/candidate.module');
const JobModule = require('./../_modules/job/job.module');
const UserModule = require('./../_modules/user/user.module');

module.exports = [
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
    ApplicationModule,
    CandidateModule,
    JobModule,
    UserModule
];