const User = require('./user.model');
const bcrypt = require('bcrypt');
const JwtService = require('./../../services/jwt.service');

module.exports = {
    async signup(req, h) {
        const encryptedPassword = await bcrypt.hash(req.payload.password, 10);
        const user = new User({
            email: req.payload.email,
            password: encryptedPassword
        });

        const savedUser = await user.save()
        .catch((err) => {
            console.log('ERROR', 'USER', 'SIGNUP');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });

        return h.response(savedUser);
    },
    async login(req, h) {
        const user = await User.findOne({email: req.payload.email})
        .catch((err) => {
            console.log('ERROR', 'USER', 'LOGIN');
            console.log(err);
            return h.response({
                erro: true
            }).code(550);
        });

        if (!user) {
            return h.response('login invalido');
        }

        const matched = await bcrypt.compare(req.payload.password, user.password);
        if (matched) {
            const token = JwtService.issue({
                payload: {
                    id: user._id,
                    email: user.email,
                },
                expiresIn: '1 day'
            });
            return h.response({token});
        } else {
            return h.response('Error login');
        }
    }
};
