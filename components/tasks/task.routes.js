const ctrl = require('./task.controller')

const {
  addTask, updateTask, acceptTask, approveTask, rejectTask, deleteTask
} = require('./task.validators');

const { verifyManagerToken, verifyWorkerToken, verifyToken } = require('../../utils/authenticate')
var multer = require('multer')
var upload = multer({ dest: 'public/attachments/' })


function userRoutes() {

  return (open, closed) => {

    //manager api's
    open.route('/task/add').post(verifyManagerToken, addTask, ctrl.addTask)
    open.route('/task/update').put(verifyManagerToken, updateTask, ctrl.updateTask)
    open.route('/task/list/:taskId').get(verifyToken, ctrl.getTaskById)
    open.route('/task/approve').post(verifyManagerToken, approveTask, ctrl.approvTask)
    open.route('/task/reject').post(verifyManagerToken, rejectTask, ctrl.rejectTask)
    open.route('/task/assigned/list').get(verifyManagerToken, ctrl.assignedtasks)
    open.route('/task/accepted/list').get(verifyManagerToken, ctrl.acceptedtasks)
    open.route('/task/completed/list').get(verifyManagerToken, ctrl.completedtasks)
    open.route('/task/approved/list').get(verifyManagerToken, ctrl.approvedtasks)
    open.route('/task/rejected/list').get(verifyManagerToken, ctrl.rejectedtasks)
    open.route('/task/delete').post(verifyManagerToken, deleteTask, ctrl.deleteTask)

    //worker api's
    open.route('/task/mytask/list').get(verifyWorkerToken, ctrl.getMytasks)
    open.route('/task/mytask/mycompleted/list').get(verifyWorkerToken, ctrl.getMyCompletedTasks)
    open.route('/task/mytask/approved/list').get(verifyWorkerToken, ctrl.getCompletedTasks)
    open.route('/task/mytask/accept').post(verifyWorkerToken, acceptTask, ctrl.acceptTask)
    open.route('/task/mytask/submit').post(verifyWorkerToken, upload.array('attachments', 5), ctrl.submitTask)
  }
}

module.exports = userRoutes()
