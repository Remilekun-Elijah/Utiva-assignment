const jwt = require('jsonwebtoken');
const UserModel = require('../model/user');

exports.validateAuth = (req, res, next) => {
 try {
  const token = req.headers.authorization;
  const {
   id
  } = jwt.verify(token, 'secret');
  res.locals.userId = id
  next();
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

exports.validateUserAvailability = async (req, res, next) => {
 try {
  const id = res.locals.userId;
  const user = await UserModel.findById(id);
  if (user) {
   next();
  } else {
   res.status(404).json({
    message: 'User not found',
    status: "error",
    data: null
   });
  }
 } catch (error) {

 }
}