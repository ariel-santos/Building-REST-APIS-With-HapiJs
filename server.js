'use strict'
const Hapi = require('@hapi/hapi');
const plugins = require('./config/plugins');

const init = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost'
    });

    await server.register(plugins);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();