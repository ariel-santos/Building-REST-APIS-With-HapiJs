const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    name: {
        require: true,
        type: String
    },
    city: String,
    address: String,
    condidates: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Candidate'
        }
    ]
});

module.exports = mongoose.model('Company', CompanySchema);