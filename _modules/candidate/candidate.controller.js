const Candidate = require('./candidate.model');

module.exports = {

    async find(req, h) {
        return h.response('Candidate not implemented');
    },
    async create(req, h) {
        const candidate = await Candidate.create({
            first_name: req.payload.first_name,
            company: req.payload.company,
            email: req.payload.email,
            last_name: req.payload.last_name
        }).catch((err) => {
            console.log('ERROR', 'CANDIDATE', 'CREATE');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });
        return h.response(candidate);
    }
};