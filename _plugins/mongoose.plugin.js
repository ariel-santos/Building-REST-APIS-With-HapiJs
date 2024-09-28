const mongoose = require('mongoose');
const MongoosePlugin = {
    register: async function (server, options, next) {
        await mongoose.connect(options.mongoDbUri, {});
        mongoose.connection.on('connected', () => {
            console.log('app is conected', options.mongoDbUri);
        });
        mongoose.connection.on('error', err => {
            console.log('Error', err);
        });
    },
    name: 'MongoosePlugin',
    pkh: require('../package.json')
};

module.exports = MongoosePlugin;