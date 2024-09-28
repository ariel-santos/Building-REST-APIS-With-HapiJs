const Company = require('./company.model');

module.exports = {
    async create(req, h) {
        // if(!request.payload.name) {
        //     return h.response({
        //         code: 1,
        //         err: 'name is required'
        //     }).code(550);
        // }

        const company = new Company({
            name: req.payload.name,
            city: req.payload.city,
            address: req.payload.address
        });

        const saved = await company.save();
        return h.response(saved);
    },
    async find(req, h) {
        // {_id: 'Not a valid ObjectId' }
        const list = await Company.find()
        .catch((err) => {
            console.log('ERROR', 'GET', '/api/companies');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });
        return h.response(list);
    },
    async findOne(req, h) {

        const company = await Company.findById(req.params.id)
        .catch((err) => {
            console.log('ERROR', 'GET', '/api/companies/{id}');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });
        return h.response(company);
    },
    async update(req, h) {
        let attr = {};
        if (!req.payload){
            return h.response({ err: true, msg: 'payload vazio'});
        }
        if (req.payload.name) {
            attr.name = req.payload.name;
        }
        if (req.payload.city) {
            attr.city = req.payload.city;
        }
        if (req.payload.address) {
            attr.address = req.payload.address;
        }

        const company = await Company.findByIdAndUpdate(req.params.id, attr, {returnDocument: 'after'})
        .catch((err) => {
            console.log('ERROR', 'PUT', '/api/companies');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });
        return h.response(company);
    },
    async delete(req, h) {

        const companies = await Company.findByIdAndDelete(req.params.id)
        .catch((err) => {
            console.log('ERROR', 'DELETE', '/api/companies/{id}');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });
        return h.response({
            err: false,
            msg: 'Deleted ' + req.params.id
        });
    }
};