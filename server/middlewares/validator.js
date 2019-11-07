import Joi from 'joi';

const validate = {
  entry(req, res, next) {
    const schema = {
      title: Joi.string().trim().max(100).required(),
      description: Joi.string().trim().max(3000).required(),
      isfavorite: Joi.boolean().required(),
    };
    const { error } = Joi.validate(req.body, schema);
    if(error) return res.status(400).json({status: 400 , message: "Please fill in all fields with valid data"});
    next();
  },

  signUp(req, res, next) {
    const schema = {
      firstName: Joi.string().trim().regex(/^[a-z ,.'-]+$/i).max(60).required(), 
      lastName: Joi.string().trim().regex(/^[a-z ,.'-]+$/i).max(60).required(),  
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).max(20)
        .required()
    };
    const { error } = Joi.validate(req.body, schema);
    if(error) return res.status(400).json({status: 400 , message: "credentials must be valid, with a Minimum eight characters, at least one uppercase letter, one lowercase letter and one number password"});
    next();
  },

  signIn(req, res, next) {
    const schema = {
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(8).required(),
    };

    const { error } = Joi.validate(req.body,schema);
    if(error) return res.status(400).json({status: 400 , message: "Please fill all the required fields with valid data" });
    next();
  },

  paramValidation(req, res, next) {
    const schema = {
      id: Joi.number().required()
    };

    const { error } = Joi.validate(req.params,schema);
    if(error) return res.status(400).json({ status: 400, message: "id should be an integer" });
    next();
  }
}

export default validate;