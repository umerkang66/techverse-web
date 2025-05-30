const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: { type: String },
  role: {
    type: String,
    enum: {
      values: ['user', 'faculty', 'security-staff', 'admin'],
      message: 'Role only can be "user", "faculty", "security-staff", "admin"',
    },
    default: 'user',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      // this will work on .save() and .create()
      validator: function (passwordConfirm) {
        return this.password === passwordConfirm;
      },
      message: 'Password should be equal to password confirm',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
