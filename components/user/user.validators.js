// // base joi 
// const BaseJoi = require('joi');
// // joi date extension 
// const Extension = require('joi-date-extensions');
// const Joi = BaseJoi.extend(Extension);

const Joi = require('joi');

// handling the joi response 
const Response = require('../../utils/response');

// add joi schema 
const schemas = {
  startRide: Joi.object().keys({
    query: {
      lat: Joi.string().required(),
      lng: Joi.string().required(),
      journeyDate: Joi.string().required()
    },
    params: {
      scheduleId: Joi.number().integer().min(1).label('Schedule Id').required(),
    }
  }),
  stopRide: Joi.object().keys({
    query: {
      status: Joi.number().required(),
      journeyDate: Joi.string().required()
    },
    params: {
      scheduleId: Joi.number().integer().min(1).label('Schedule Id').required(),
    }
  }),
  getChannel: Joi.object().keys({
    scheduleId: Joi.number().integer().min(1).label('Schedule Id').required()
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
  startRide: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.startRide;
    let option = options.basic;

    // validating the schema 
    schema.validate({ query: req.query, }, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      let error = [];
      err.details.forEach(element => {
        error.push(element.message);
      });

      // returning the response 
      Response.joierrors(req, res, err);
    });
  },
  stopRide: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.stopRide;
    let option = options.basic;

    // validating the schema 
    schema.validate({ query: req.query, }, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      let error = [];
      err.details.forEach(element => {
        error.push(element.message);
      });

      // returning the response 
      Response.joierrors(req, res, err);
    });
  },
  getChannel: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.getChannel;
    let option = options.basic;

    // validating the schema 
    schema.validate(req.params, option).then(() => {
      next();
      // if error occured
    }).catch((err) => {
      let error = [];
      err.details.forEach(element => {
        error.push(element.message);
      });

      // returning the response 
      Response.joierrors(req, res, err);
    });
  },
}
