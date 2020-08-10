const { error } = require('../../utils').logging
const { success, fail } = require('../../utils').response

const moment = require('moment')
const taskModel = require('./task.model')

function componentOneCtrl(model) {
  const methods = {

    addTask: async (req, res) => {
      try {

        let insertData = {}
        insertData.userId = req.body.userId
        insertData.taskTitle = req.body.taskTitle
        insertData.taskDescription = req.body.taskDescription
        insertData.taskExpiryAt = req.body.taskExpiryAt
        insertData.taskPoints = req.body.taskPoints
        insertData.taskAssignedAt = moment().utcOffset("+05:30").format()

        let addTask = await new taskModel(insertData).save();

        return success(res, 200, "Task added sucessfull", addTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    updateTask: async (req, res) => {
      try {

        let checkTask = await taskModel.findOne({ _id: req.body.taskId })

        if (!checkTask) {
          return fail(res, 400, "Task not found")
        }

        let updateData = {}
        updateData.userId = req.body.userId
        updateData.taskTitle = req.body.taskTitle
        updateData.taskDescription = req.body.taskDescription
        updateData.taskExpiryAt = req.body.taskExpiryAt
        updateData.taskPoints = req.body.taskPoints
        updateData.taskAssignedAt = moment().utcOffset("+05:30").format()

        let updateTask = await taskModel.findOneAndUpdate({ _id: req.body.taskId }, updateData);

        return success(res, 200, "Task updated sucessfull", updateTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    getTaskById: async (req, res) => {
      try {

        let checkTask = await taskModel.findOne({ _id: req.params.taskId })

        if (!checkTask) {
          return fail(res, 400, "Task not found")
        }

        return success(res, 200, "Task listed successfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    assignedtasks: async (req, res) => {
      try {

        // let limit = req.query.limit ? parseInt(req.query.limit) : 10
        // let page = Math.max(0, req.query.page)

        let checkTask = await taskModel.find({ taskStatus: 1 }).populate('userId', '_id fullName email')
        // .select('taskTitle taskDescription taskExpiryAt taskAssignedAt taskPoints taskStatus')
        // .limit(limit)
        // .skip(limit * page)



        return success(res, 200, "Task listed sucessfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    acceptedtasks: async (req, res) => {
      try {

        // let limit = req.query.limit ? parseInt(req.query.limit) : 10
        // let page = Math.max(0, req.query.page)

        let checkTask = await taskModel.find({ taskStatus: 2 }).populate('userId', '_id fullName email')
        // .select('taskTitle taskDescription taskExpiryAt taskAssignedAt taskPoints taskStatus')
        // .limit(limit)
        // .skip(limit * page)



        return success(res, 200, "Task listed sucessfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    completedtasks: async (req, res) => {
      try {

        // let limit = req.query.limit ? parseInt(req.query.limit) : 10
        // let page = Math.max(0, req.query.page)

        let checkTask = await taskModel.find({ taskStatus: 3 }).populate('userId', '_id fullName email')
        // .select('taskTitle taskDescription taskExpiryAt taskAssignedAt taskPoints taskStatus')
        // .limit(limit)
        // .skip(limit * page)



        return success(res, 200, "Task listed sucessfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    approvedtasks: async (req, res) => {
      try {

        // let limit = req.query.limit ? parseInt(req.query.limit) : 10
        // let page = Math.max(0, req.query.page)

        let checkTask = await taskModel.find({ taskStatus: 4 }).populate('userId', '_id fullName email')
        // .select('taskTitle taskDescription taskExpiryAt taskAssignedAt taskPoints taskStatus')
        // .limit(limit)
        // .skip(limit * page)



        return success(res, 200, "Task listed sucessfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    rejectedtasks: async (req, res) => {
      try {

        // let limit = req.query.limit ? parseInt(req.query.limit) : 10
        // let page = Math.max(0, req.query.page)

        let checkTask = await taskModel.find({ taskStatus: 5 }).populate('userId', '_id fullName email')
        // .select('taskTitle taskDescription taskExpiryAt taskAssignedAt taskPoints taskStatus')
        // .limit(limit)
        // .skip(limit * page)



        return success(res, 200, "Task listed sucessfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    getMytasks: async (req, res) => {
      try {

        // let limit = req.query.limit ? parseInt(req.query.limit) : 10
        // let page = Math.max(0, req.query.page)

        let checkTask = await taskModel.find({ userId: req.user._id, taskStatus: { $in: [1, 2] } })
        // .select('taskTitle taskDescription taskExpiryAt taskAssignedAt taskPoints taskStatus')
        // .limit(limit)
        // .skip(limit * page)



        return success(res, 200, "Task listed sucessfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    getMyCompletedTasks: async (req, res) => {
      try {

        // let limit = req.query.limit ? parseInt(req.query.limit) : 10
        // let page = Math.max(0, req.query.page)

        let checkTask = await taskModel.find({ userId: req.user._id, taskStatus: { $in: [3] } })
        // .select('taskTitle taskDescription taskExpiryAt taskAssignedAt taskPoints taskStatus')
        // .limit(limit)
        // .skip(limit * page)



        return success(res, 200, "Task listed sucessfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    getCompletedTasks: async (req, res) => {
      try {

        let checkTask = await taskModel.find({ userId: req.user._id, taskStatus: { $in: [4] } })
        // .select('taskTitle taskDescription taskExpiryAt taskAssignedAt taskPoints taskStatus')

        return success(res, 200, "Task listed sucessfully", checkTask)
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    acceptTask: async (req, res) => {
      try {

        let checkTask = await taskModel.findOne({ _id: req.body.taskId, userId: req.user._id, taskStatus: 1 })

        if (!checkTask) {
          return fail(res, 400, "Task not found")
        }

        let updateTask = await taskModel.findOneAndUpdate({ _id: req.body.taskId }, { taskStatus: 2 });

        return success(res, 200, "Task accepted sucessfull")
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    deleteTask: async (req, res) => {
      try {

        let checkTask = await taskModel.findOne({ _id: req.body.taskId })

        if (!checkTask) {
          return fail(res, 400, "Task not found")
        }
        else {
          if (checkTask.taskStatus != 1) {
            return fail(res, 400, "cant delete this task")
          }
        }
        let deleteTask = await taskModel.deleteOne({ _id: req.body.taskId });

        return success(res, 200, "Task deleted sucessfull")
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },


    submitTask: async (req, res) => {
      try {

        console.log("req.files", req.files);

        let attachments = req.files.map(file => file.filename)
        console.log("attachments", attachments);

        let checkTask = await taskModel.findOne({ _id: req.body.taskId, userId: req.user._id, taskStatus: 2 })

        if (!checkTask) {
          return fail(res, 400, "Task not found")
        }

        let updateData = {
          workerAttachments: attachments,
          workerComments: req.body.comments,
          taskStatus: 3
        }

        let updateTask = await taskModel.findOneAndUpdate({ _id: req.body.taskId }, updateData);

        return success(res, 200, "Task submitted sucessfull")
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    approvTask: async (req, res) => {
      try {

        let checkTask = await taskModel.findOne({ _id: req.body.taskId, taskStatus: 3 })

        if (!checkTask) {
          return fail(res, 400, "Task not found")
        }

        let updateData = {
          managerComments: req.body.comments,
          taskStatus: 4
        }

        let updateTask = await taskModel.findOneAndUpdate({ _id: req.body.taskId }, updateData);

        return success(res, 200, "Task approved sucessfull")
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    },

    rejectTask: async (req, res) => {
      try {

        let checkTask = await taskModel.findOne({ _id: req.body.taskId, taskStatus: 3 })

        if (!checkTask) {
          return fail(res, 400, "Task not found")
        }

        let updateData = {
          managerComments: req.body.comments,
          taskStatus: 5
        }

        let updateTask = await taskModel.findOneAndUpdate({ _id: req.body.taskId }, updateData);

        return success(res, 200, "Task rejected sucessfull")
      } catch (e) {
        console.log("e", e);
        return fail(res, 500, e)
      }
    }


  }
  return Object.freeze(methods)
}

module.exports = componentOneCtrl()
