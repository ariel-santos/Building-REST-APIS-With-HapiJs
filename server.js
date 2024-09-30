'use strict'
const Hapi = require('@hapi/hapi');
const plugins = require('./config/plugins');
const JwtService = require('./services/jwt.service');
const config = require('./config/development');

const init = async () => {
    const server = Hapi.server({
        port: config.port,
        host: config.host // 'localhost'
    });

    await server.register(plugins);

    server.auth.strategy('jwt', 'jwt', {
        key: config.secretKey,
        validate: JwtService.validate,
        verifyOptions: JwtService.verifyOptions()
    });
    server.auth.default('jwt');

    await server.start();
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init().then(server => {
    console.log('Server running at:', server.info.uri);
}).catch(err => {
    console.log('Server running ERRROR', err);
});