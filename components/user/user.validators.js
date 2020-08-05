// // base joi 
const BaseJoi = require('joi');
// joi date extension 
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

// const Joi = require('joi');

// handling the joi response 
const Response = require('../../utils/response');

// add joi schema 
const schemas = {
  managerSignup: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    fullName: Joi.string().required(),
    password: Joi.string().required(),
    userType: Joi.number().integer().label('User type').optional(),
  }),
  workerSignup: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    fullName: Joi.string().required(),
    password: Joi.string().required(),
    userType: Joi.number().integer().label('User type').optional(),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required()
  }),
  passwordChange: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  }),
  profileUpdate: Joi.object().keys({
    fullName: Joi.string().required()
  })
};

const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true
    }
  }
};

module.exports = {
  // exports validate admin signin 
  managerSignup: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.managerSignup;
    let option = options.basic;

    // validating the schema 
    schema.validate(req.body, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      // returning the response 
      Response.joierrors(res, err);
    });
  },
  workerSignup: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.workerSignup;
    let option = options.basic;

    // validating the schema 
    schema.validate(req.body, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      // returning the response 
      Response.joierrors(res, err);
    });
  },
  login: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.login;
    let option = options.basic;

    // validating the schema 
    schema.validate(req.body, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      // returning the response 
      Response.joierrors(res, err);
    });
  },
  passwordChange: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.passwordChange;
    let option = options.basic;

    // validating the schema 
    schema.validate(req.body, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      // returning the response 
      Response.joierrors(res, err);
    });
  },
  profileUpdate: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.profileUpdate;
    let option = options.basic;

    // validating the schema 
    schema.validate(req.body, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      // returning the response 
      Response.joierrors(res, err);
    });
  }
}
