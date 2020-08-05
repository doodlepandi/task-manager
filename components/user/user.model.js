const mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  authToken: {
    type: String
  },
  userType: {
    type: Number,
    default: 1 // 1 - manager, 2 - worker
  },
  loggedIn: {
    type: Date
  },
  emailVerificationStatus: {
    type: Number,
    default: 0 // 0 - Account not verified , 1-verified  
  },
  status: {
    type: Number,
    default: 0 // 1-active, 2-inactive, 3 -delete
  }
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
const user = mongoose.model('users', userSchema);

module.exports = user;