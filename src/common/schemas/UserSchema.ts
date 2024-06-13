import * as Joi from 'joi';


const registerObject = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.number().required(),
    email: Joi.string().email().required()
}
const loginObject = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}


const login = Joi.object(loginObject)
const register = Joi.object(registerObject)
export default {
    login,
    register
}

