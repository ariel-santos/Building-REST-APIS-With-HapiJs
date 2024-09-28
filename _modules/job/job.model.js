const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobSchema = new Schema({
    title: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Job', JobSchema);