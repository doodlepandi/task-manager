const { error } = require('../../utils').logging
const { success, fail } = require('../../utils').response
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('./user.model')
const user = require('./user.model')
const { log } = require('../../utils/logging')

const {
  generateHash
} = new user();

function componentOneCtrl(model) {
  const methods = {
    doSomething: async (req, res) => {
      try {
        return success(res, 200, 'Route works')
      } catch (e) {
        error(e)
        return fail(res, 500)
      }
    },
    doSomethingElse: async (req, res) => {
      try {
        return success(res, 200, 'Route works')
      } catch (e) {
        error(e)
        return fail(res, 500)
      }
    },

    signupManager: async (req, res) => {
      try {

        let checkUser = await userModel.findOne({
          'email': req.body.email.trim().toLowerCase()
        })

        //user exist
        if (checkUser) {
          //check if email is verified
          return fail(res, 400, "Email already exist")
        }
        else {
          req.body.password = await generateHash(req.body.password)

          let insertData = {}
          insertData.fullName = req.body.fullName
          insertData.email = req.body.email
          insertData.password = req.body.password
          insertData.userType = 1

          let signupCustomer = await new userModel(insertData).save();

        }

        return success(res, 200, "Manager registration sucessfull")
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    signupWorker: async (req, res) => {
      try {

        let checkUser = await userModel.findOne({
          'email': req.body.email.trim().toLowerCase()
        })

        //user exist
        if (checkUser) {
          //check if email is verified
          return fail(res, 400, "Email already exist")
        }
        else {
          req.body.password = await generateHash(req.body.password)

          let insertData = {}
          insertData.fullName = req.body.fullName
          insertData.email = req.body.email
          insertData.password = req.body.password
          insertData.userType = 2

          let signupCustomer = await new userModel(insertData).save();

        }

        return success(res, 200, "Worker registration sucessfull")
      } catch (e) {
        return fail(res, 500, e)
      }
    },

    login: async (req, res) => {
      try {
        console.log(req.body)

        let userData = await userModel.findOne({
          email: req.body.email,
          status: {
            $ne: 3 // deleted
          }
        }).select('fullName email userType password status')

        if (userData === null) {
          return fail(res, 400, "User not found")
        }
        else {
          if (userData.status == 2) {
            return fail(res, 400, "User deactivated by manager")
          }
        }

        let validPassword = userData.validPassword(req.body.password);

        if (!validPassword) { // Wrong Password
          return fail(res, 400, "Authentication failed. Wrong password")
        }

        /* Update User */
        userData.loggedIn = Date.now();

        let updatedData = await userData.save(),
          doc = updatedData.toObject(),
          user = {
            id: doc._id,
            loggedIn: doc.loggedIn
          },


          token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '24h' }),
          newUserData = doc;

        // Limit Data
        delete newUserData.password;
        newUserData.token = token
        return success(res, 200, "You are logged in Successfully !", newUserData);

      } catch (err) {
        console.log("err", err);
        return fail(res, 500)
      }

    },

    profileDetails: async (req, res) => {
      try {

        let getProfile = await userModel.findById(req.user._id).select('fullName email userType loggedIn')


        //user exist
        if (!getProfile) {
          //check if email is verified
          return fail(res, 400, "User exist")
        }

        return success(res, 200, "profile details", getProfile)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    // CHANGE PASSWORD
    async changePassword(req, res) {

      try {
        // Get User Details
        let currentUser = await userModel.findOne({
          _id: req.user._id
        })

        if (!currentUser) {
          return fail(res, 400, 'User Not Found');
        }
        // Check Password
        let newPassword = generateHash(req.body.newPassword);
        let validPassword = currentUser.validPassword(req.body.oldPassword);

        if (!validPassword) {
          return fail(res, 400, 'Old password is not matched');
        }
        // Set New Password
        currentUser.password = newPassword;
        let updatedData = await currentUser.save()

        return success(res, 200, `Password Changed Successfully`);

      } catch (err) {
        console.log("err", err);

        return fail(res, 500, err)
      }
    },

    // CHANGE PASSWORD
    async profileUpdate(req, res) {

      try {

        // Get User Details
        let currentUser = await userModel.findOne({
          _id: req.user._id
        })

        if (!currentUser) {
          return fail(res, 400, 'User Not Found');
        }

        // Set New Password
        currentUser.fullName = req.body.fullName;
        let updatedData = await currentUser.save()

        return success(res, 200, `Profile updated Successfully`);

      } catch (err) {
        console.log("err", err);

        return fail(res, 500, err)
      }
    },

    async activateUser(req, res) {

      try {

        // Get User Details
        let currentUser = await userModel.findOne({
          _id: req.body.userId,
          userType: 2
        })

        if (!currentUser) {
          return fail(res, 400, 'User Not Found');
        }

        // Set New Password
        currentUser.status = 1;
        let updatedData = await currentUser.save()

        return success(res, 200, `User activated Successfully`);

      } catch (err) {
        console.log("err", err);

        return fail(res, 500, err)
      }
    },

    async deactivateUser(req, res) {

      try {

        // Get User Details
        let currentUser = await userModel.findOne({
          _id: req.body.userId,
          userType: 2
        })

        if (!currentUser) {
          return fail(res, 400, 'User Not Found');
        }

        // Set New Password
        currentUser.status = 2;
        let updatedData = await currentUser.save()

        return success(res, 200, `User deactivated Successfully`);

      } catch (err) {
        console.log("err", err);

        return fail(res, 500, err)
      }
    },

    workersList: async (req, res) => {
      try {

        // let limit = req.query.limit ? parseInt(req.query.limit) : 10
        // let page = Math.max(0, req.query.page)

        let getWorkersList = await userModel.find({
          userType: 2,
          // status: 1
        })
          // .limit(limit)
          // .skip(limit * page)
          .select('_id fullName email userType loggedIn status')

        return success(res, 200, "workers list", getWorkersList)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    workersDropdown: async (req, res) => {
      try {

        let getWorkersList = await userModel.find({
          userType: 2,
          status: 1
        })
          .select('_id fullName email')

        return success(res, 200, "workers list", getWorkersList)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    }

  }
  return Object.freeze(methods)
}

module.exports = componentOneCtrl()
