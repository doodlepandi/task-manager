const jwt = require('jsonwebtoken');
const userModel = require('../components/user/user.model');

const { success, fail } = require('./response')
const {
  error,
  info
} = require('./logging')


// authenticate
function authenticate() {
  const methods = {

    //check end user token
    verifyManagerToken: async (req, res, next) => {
      try {
        let token = req.headers['x-access-token'];
        if (token === undefined)
          return fail(res, 401, 'Authentication Failed')

        // if token is not present
        if (!token)
          return fail(res, 401, 'Authentication Failed');

        let decoded = await jwt.verify(token, process.env.SECRET_KEY);
        let customerData = '';
        customerData = await userModel.findOne({
          _id: decoded.id,
          userType: 1,
          loggedIn: decoded.loggedIn
        }).select('fullName email userType password')

        customerData.password = undefined;

        if (customerData) {
          req.user = customerData;
          next();
        } else {
          return errors(res, 401);
        }
      } catch (err) {
        if (err.name === 'TokenExpiredError')
          return fail(res, 401, 'Your Session has expired, Please Login again.');

        else if (err.name === 'JsonWebTokenError')
          return fail(res, 401, 'Unauthorised Access, Please Login again.');
        else
          return fail(res, 401, 'Unauthorised Access, Please Login again.');
      }
    },

    //Customer token verification
    verifyWorkerToken: async (req, res, next) => {
      try {
        let token = req.headers['x-access-token'];
        if (token === undefined)
          return fail(res, 401, 'Authentication Failed')

        // if token is not present
        if (!token)
          return fail(res, 401, 'Authentication Failed');

        let decoded = await jwt.verify(token, process.env.SECRET_KEY);
        let customerData = '';
        customerData = await userModel.findOne({
          _id: decoded.id,
          userType: 2,
          loggedIn: decoded.loggedIn
        }).select('fullName email userType password')

        customerData.password = undefined;

        if (customerData) {
          req.user = customerData;
          next();
        } else {
          return errors(res, 401);
        }
      } catch (err) {
        console.log("err", err);

        if (err.name === 'TokenExpiredError')
          return fail(res, 401, 'Your Session has expired, Please Login again.');

        else if (err.name === 'JsonWebTokenError')
          return fail(res, 401, 'Unauthorised Access, Please Login again.');
        else
          return fail(res, 401, 'Unauthorised Access, Please Login again.');
      }
    },

    verifyToken: async (req, res, next) => {
      try {
        let token = req.headers['x-access-token'];
        if (token === undefined)
          return fail(res, 401, 'Authentication Failed')

        // if token is not present
        if (!token)
          return fail(res, 401, 'Authentication Failed');

        let decoded = await jwt.verify(token, process.env.SECRET_KEY);
        let customerData = '';
        customerData = await userModel.findOne({
          _id: decoded.id,
          loggedIn: decoded.loggedIn
        }).select('fullName email userType password')

        customerData.password = undefined;

        if (customerData) {
          req.user = customerData;
          next();
        } else {
          return errors(res, 401);
        }
      } catch (err) {
        if (err.name === 'TokenExpiredError')
          return fail(res, 401, 'Your Session has expired, Please Login again.');

        else if (err.name === 'JsonWebTokenError')
          return fail(res, 401, 'Unauthorised Access, Please Login again.');
        else
          return fail(res, 401, 'Unauthorised Access, Please Login again.');
      }
    }
  };

  // return Object freeze 
  return Object.freeze(methods);
}

// exporting the modules 
module.exports = authenticate();
