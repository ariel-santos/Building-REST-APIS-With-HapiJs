const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    company: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    }
});

module.exports = mongoose.model('Job', JobSchema);