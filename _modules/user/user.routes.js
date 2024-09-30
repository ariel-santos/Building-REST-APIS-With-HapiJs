const UserController = require('./user.controller');
const Joi = require('joi');

module.exports = [
    {
        path: '/users/signup',
        method: 'POST',
        handler: UserController.signup,
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                })
            },
            auth: false
        }
    },
    {
        path: '/users/login',
        method: 'POST',
        handler: UserController.login,
        config: {
            tags: ['api'],
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            auth: false
        },
    }
];