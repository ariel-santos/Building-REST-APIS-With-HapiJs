const Job = require('./job.model');
const Company = require('./../company/company.model');

module.exports = {

    async find(req, h) {
        const job = await Job.find()
        .populate('company')
        .catch((err) => {
            console.log('ERROR', 'JOB', 'CREATE');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });

        return h.response(job);
    },
    async create(req, h) {
        const job = await Job.create({
            title: req.payload.title,
            company: req.payload.company
        })
        .catch((err) => {
            console.log('ERROR', 'JOB', 'CREATE');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });

        const _company = await Company.findById(req.payload.company)
        .catch((err) => {
            console.log('ERROR', 'JOB', 'CREATE');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });
        _company.jobs.push(job);
        _company.save();

        return h.response(job);
    }
};