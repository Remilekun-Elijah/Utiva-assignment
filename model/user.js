const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
 name: String,
 email: {
  type: String,
  required: [true, 'Email is required'],
  unique: true,
 },
 number: {
  type: String,
  required: [true, 'Number is required'],
 },
 age: {
  type: Number,
  required: [true, 'Age is required'],
 },
 password: {
  type: String,
  required: [true, 'Password is required'],
  minlength: [6, 'Password must be at least 6 characters'],
 },
 token: String
}, { timestamps: true });

const User = model('user', userSchema);

module.exports = User;