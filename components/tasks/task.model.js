const mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  taskTitle: {
    type: String,
    required: true
  },
  taskDescription: {
    type: String
  },
  managerComments: {
    type: String
  },
  workerComments: {
    type: String
  },
  workerAttachments: [{
    type: String
  }],
  taskExpiryAt: {
    type: Date
  },
  taskAssignedAt: {
    type: Date
  },
  taskPoints: {
    type: Number
  },
  taskStatus: {
    type: Number,
    default: 1 // 1 - Assigned , 2-Accepted, 3 - completed, 4 - accepted by admin , 5 - rejected by admin    
  },
  status: {
    type: Number,
    default: 1
  },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
}, {
  timestamps: true
});


const task = mongoose.model('tasks', taskSchema);

module.exports = task;