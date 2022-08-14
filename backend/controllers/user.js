const jwt = require('jsonwebtoken');
const UserModel = require('../model/user');


exports.getAllUsers = async function (req, res) {
 try {
   const users = await UserModel.find({})
   res.status(200).json({
     message: 'Users retrieved successfully',
     status: "success",
     data: users
   })

 } catch (error) {
   res.status(500).json({
     message: 'Error getting users',
     status: "error",
     data: error.message
   })
 }
}

exports.updateUser = async function (req, res) {
 const {
   name,
   email,
   number,
   age
 } = req.body
 const user = {
   name,
   email,
   number,
   age
 }

 try {
   const updatedData = await UserModel.findByIdAndUpdate(req.params.id, user, {
     new: true
   })

   res.status(200).json({
     message: 'User updated successfully',
     status: "success",
     data: updatedData
   })
 } catch (error) {
   res.status(500).json({
     message: 'Error updating user',
     status: "error",
     data: error.message
   })
 }
}

exports.getLoggedInUser = async function (req, res) {
 try {

  const id = res.locals.userId;

   const user = await UserModel.findById(id)

     delete user._doc.password;
     res.status(200).json({
       message: 'Users info retrieved successfully',
       status: "success",
       data: user
     })
   
 } catch (error) {
   let errorObj = {
     message: 'Something went wrong',
     data: null,
     status: "error",
     code: 401
   }
   if (error.name === 'TokenExpiredError') {
     errorObj.message = 'Session expired, please login again.'
   } else if (error.name === 'JsonWebTokenError') {
     errorObj.message = 'Invalid token'
   } else {
     errorObj.code = 500
   }

   const {
     code
   } = errorObj;
   delete errorObj.code;
   res.status(code).json(errorObj);
 }
}

exports.getUser = async function (req, res) {
 const id = req.params.id

 try {
   const user = await UserModel.findById(id)
   const r = {}
   if (user) {
     r.message = 'User retrieved successfully'
     r.status = "success"
     r.data = user
     r.code = 200
   } else {
     r.message = 'User not found'
     r.status = "error"
     r.data = null
     r.code = 404
   }

   res.status(r.code).json({
     message: r.message,
     status: r.status,
     data: r.data
   })
 } catch (error) {
   res.status(500).json({
     message: 'Error getting user',
     status: "error",
     data: error.message
   })
 }
}

exports.deleteUser = async function (req, res) {
 try {
   const id = req.params.id;

   const user = await UserModel.findByIdAndDelete(id)
   const r = {};
   if (user) {
     r.message = 'User deleted successfully'
     r.status = "success"
     r.data = user
     r.code = 200
   } else {
     r.message = 'User not found'
     r.status = "error"
     r.data = null
     r.code = 404
   }
   res.status(r.code).json({
     message: r.message,
     status: r.status,
     data: r.data
   })
 } catch (error) {
   res.status(500).json({
     message: 'Error deleting user',
     status: "error",
     data: error.message
   })
 }
}