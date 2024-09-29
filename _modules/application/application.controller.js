const Application = require('./application.model');

module.exports = {
    async find(req, h) {
        return h.response('not implemented');
    },
    async create(req, h) {
        const application = await Application.create({
            hired: req.payload.hired,
            job: req.payload.job,
            candidate: req.payload.candidate,
        })
        .catch((err) => {
            console.log('ERROR', 'APPLICATION', 'CREATE');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });

        return h.response(application);
    }
}