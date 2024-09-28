const UserController = require('./user.controller');
const Joi = require('joi');

module.exports = [
    {
        path: '/api/users/signup',
        method: 'POST',
        handler: UserController.signup,
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                })
            }
        }
    }
];