const Joi = require('joi');

//ExPassword: Ramashankar@123
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().pattern(passwordPattern).required().messages({
            'string.empty': 'Password is required.',
            'string.pattern.base': 'Password must be at least 8 characters, include uppercase, lowercase, a number and a special character.'
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Registration Failed: ', error });
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Login Failed: ', error });
    }
    next();
}

module.exports = { signupValidation, loginValidation };