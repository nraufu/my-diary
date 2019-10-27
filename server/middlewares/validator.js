import Joi from 'joi';

const validate = {

  entry(req, res, next) {
    const schema = {
      title: Joi.string().max(100).required(),
      description: Joi.string().min(100).max(3000).required(),
    };
    const {
      error
    } = Joi.validate(req.body, schema);
    if(error) return res.status(400).send(error.details[0].message);
    next();
  },

  signUp(req, res, next) {
    const schema = {
      firstName: Joi.string().regex(/^[a-zA-Z]+$/).max(100).required(),
      lastName: Joi.string().regex(/^[a-zA-Z]+$/).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]+$/).min(8).max(20)
        .required()
    };
    const { error } = Joi.validate(req.body,schema);
    if(error) return res.status(400).send(error.details[0].message);
    next();
  }

}


module.exports = validate;