const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    hired: Boolean
});

module.exports = mongoose.model('Application', ApplicationSchema);