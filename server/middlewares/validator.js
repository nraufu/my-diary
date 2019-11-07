import Joi from 'joi';

const validate = {
  entry(req, res, next) {
    const schema = {
      title: Joi.string().trim().max(100).required(),
      description: Joi.string().trim().max(3000).required(),
      isfavorite: Joi.boolean().required(),
    };
    const { error } = Joi.validate(req.body, schema);
    if(error) return res.status(400).json({status: 400 , error: error.details[0].message});
    next();
  },

  signUp(req, res, next) {
    const schema = {
      firstName: Joi.string().trim().regex(/[A-Za-z0-9\. -]+/).max(60).required(), 
      lastName: Joi.string().trim().regex(/[A-Za-z0-9\. -]+/).max(60).required(),  
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().regex(/^[a-zA-Z0-9]+$/).min(8).max(20)
        .required()
    };
    const { error } = Joi.validate(req.body,schema);
    if(error) return res.status(400).json({status: 400 , error: error.details[0].message});
    next();
  },

  signIn(req, res, next) {
    const schema = {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(8).required(),
    };

    const { error } = Joi.validate(req.body,schema);
    if(error) return res.status(400).json({status: 400 , error: error.details[0].message});
    next();
  },

  paramValidation(req, res, next) {
    const schema = {
      id: Joi.number().required()
    };

    const { error } = Joi.validate(req.params,schema);
    if(error) return res.status(400).json({ status: 400, "Error": "id should be an integer" });
    next();
  }
}

export default validate;