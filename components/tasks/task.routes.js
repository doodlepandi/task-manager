const ctrl = require('./task.controller')

const {
  startRide
} = require('./task.validators');

function userRoutes() {

  return (open, closed) => {
    open.route('/index').get(ctrl.doSomething)

    closed.route('/index').get(ctrl.doSomethingElse)
  }
}

module.exports = userRoutes()
