const ctrl = require('./user.controller')

const {
  startRide
} = require('./user.validators');

function userRoutes() {

  return (open, closed) => {
    open.route('/index').get(ctrl.doSomething)

    closed.route('/index').get(ctrl.doSomethingElse)
  }
}

module.exports = userRoutes()
