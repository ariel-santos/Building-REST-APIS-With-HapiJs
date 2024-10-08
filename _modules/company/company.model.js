const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    name: {
        require: true,
        type: String
    },
    city: String,
    address: String,
    candidates: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Candidate'
        }
    ],
    jobs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Company', CompanySchema);