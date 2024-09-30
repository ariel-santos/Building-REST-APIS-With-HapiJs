const jwt = require('jsonwebtoken');

const User = require('./../_modules/user/user.model');
const config = require('./../config/development');

module.exports = {
    issue(options) {
        let { payload, expiresIn } = options;
        return jwt.sign(payload, config.secretKey, {
            expiresIn: expiresIn
        })
    },
    async validate(decoded, request, h) {
        const user = await User.findOne({
            _id: decoded.id,
            email: decoded.email
        })
        .catch((err) => {
            console.log('ERROR', 'SERVICE', 'VALIDATE');
            console.log(err);
            return { isValid: false };
        });
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true };
    },
    verifyOptions() {
        return { algorithms: ['HS256'] };
    }
};
