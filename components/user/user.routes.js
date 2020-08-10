const ctrl = require('./user.controller')

const {
  managerSignup, workerSignup, login, passwordChange, profileUpdate, activateUser, deactivateUser
} = require('./user.validators');

const { verifyManagerToken, verifyWorkerToken, verifyToken } = require('../../utils/authenticate')

function userRoutes() {

  return (open, closed) => {
    open.route('/user/manager/signup').post(managerSignup, ctrl.signupManager)
    open.route('/user/worker/signup').post(workerSignup, ctrl.signupWorker)
    open.route('/user/login').post(login, ctrl.login)
    open.route('/user/profile/details').get(verifyToken, ctrl.profileDetails)
    open.route('/user/update/profile').put(verifyToken, profileUpdate, ctrl.profileUpdate)
    open.route('/user/password/change').post(verifyToken, passwordChange, ctrl.changePassword)
    open.route('/user/workers/list').get(verifyManagerToken, ctrl.workersList)
    open.route('/user/workers/dropdown').get(verifyManagerToken, ctrl.workersDropdown)

    open.route('/user/active').put(verifyToken, activateUser, ctrl.activateUser)
    open.route('/user/deactive').put(verifyToken, deactivateUser, ctrl.deactivateUser)
  }
}

module.exports = userRoutes()
