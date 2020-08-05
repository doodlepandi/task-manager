const mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
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
  loggedIn: {
    type: Date
  },
  taskStatus: {
    type: Number,
    default: 0 // 0 - Assigned , 1-Accepted, 2- in porgress , 3 - completed  
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

//method to encrypt password
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//method to decrypt password
userSchema.methods.validPassword = function (password) {
  var userData = this;
  return bcrypt.compareSync(password, userData.password);
};
const user = mongoose.model('tasks', userSchema);

module.exports = user;