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
  addTask: Joi.object().keys({
    taskTitle: Joi.string().required(),
    taskDescription: Joi.string().required(),
    taskExpiryAt: Joi.date().required(),
    userId: Joi.string().label('User id').required(),
    taskPoints: Joi.number().label('taskPoints').required()
  }),
  updateTask: Joi.object().keys({
    taskId: Joi.string().required(),
    taskTitle: Joi.string().required(),
    taskDescription: Joi.string().required(),
    taskExpiryAt: Joi.date().required(),
    userId: Joi.string().label('User id').required(),
    taskPoints: Joi.number().label('taskPoints').required()
  }),
  taskDelete: Joi.object().keys({
    taskId: Joi.string().required()
  }),
  acceptTask: Joi.object().keys({
    taskId: Joi.string().required()
  }),
  deleteTask: Joi.object().keys({
    taskId: Joi.string().required()
  }),
  approveTask: Joi.object().keys({
    taskId: Joi.string().required(),
    comments: Joi.string().required()
  }),
  rejectTask: Joi.object().keys({
    taskId: Joi.string().required(),
    comments: Joi.string().required()
  }),
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
  addTask: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.addTask;
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
  updateTask: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.updateTask;
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
  acceptTask: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.acceptTask;
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
  deleteTask: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.deleteTask;
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
  approveTask: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.approveTask;
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
  rejectTask: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.rejectTask;
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
