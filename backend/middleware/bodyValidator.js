const Joi = require('joi');

const signupSchema = Joi.object().keys({
 name: Joi.string().min(3).max(30).required(),
 email: Joi.string().email({
  minDomainSegments: 2
 }).required(),
 number: Joi.number().integer().min(1).max(9999999999).required(),
 age: Joi.number().integer().min(1).max(100).required(),
 password: Joi.string().min(6).max(30).required(),
 confirmPassword: Joi.ref('password')
});

const loginSchema = Joi.object().keys({
 email: Joi.string().email({
  minDomainSegments: 2
 }).required(),
 password: Joi.string().min(6).max(30).required()
});

const updateProfileSchema = Joi.object().keys({
 name: Joi.string().min(3).max(30),
 email: Joi.string().email({
  minDomainSegments: 2
 }),
 number: Joi.number().integer().min(1).max(9999999999),
 age: Joi.number().integer().min(1).max(100)
});

const changePasswordSchema = Joi.object().keys({
 oldPassword: Joi.string().min(6).max(30).required(),
 newPassword: Joi.string().min(6).max(30).required(),
 confirmPassword: Joi.ref("newPassword")
});

const forgotPasswordSchema = Joi.object().keys({
 email: Joi.string().email({
  minDomainSegments: 2
 }).required()
});

const resetPasswordSchema = Joi.object().keys({
 password: Joi.string().min(6).max(30).required(),
 confirmPassword: Joi.ref("password"),
 token: Joi.string().required()
});

exports.signupValidator = async (req, res, next) => {
 try {
  const data = await signupSchema.validateAsync(req.body);
  res.locals.validatedBody = data;
  next();
 } catch (error) {
  res.status(422).json({
   message: error.message,
   status: "error",
  })
 }
}

exports.loginValidator = async (req, res, next) => {
 try {
  const data = await loginSchema.validateAsync(req.body);
  res.locals.validatedBody = data;
  next();
 } catch (error) {
  res.status(422).json({
   message: error.message,
   status: "error",
  })
 }
}

exports.updateProfileValidator = async (req, res, next) => {
 try {
  const data = await updateProfileSchema.validateAsync(req.body);
  res.locals.validatedBody = data;
  next();
 } catch (error) {
  res.status(422).json({
   message: error.message,
   status: "error",
  })
 }
}

exports.changePasswordValidator = async (req, res, next) => {
 try {
  const data = await changePasswordSchema.validateAsync(req.body);
  res.locals.validatedBody = data;
  next();
 } catch (error) {
  res.status(422).json({
   message: error.message,
   status: "error",
  })
 }
}


exports.forgotPasswordValidator = async (req, res, next) => {
 try {
  const data = await forgotPasswordSchema.validateAsync(req.body);
  res.locals.validatedBody = data;
  next();
 } catch (error) {
  res.status(422).json({
   message: error.message,
   status: "error",
  })
 }
}

exports.resetPasswordValidator = async (req, res, next) => {
 try {
  const data = await resetPasswordSchema.validateAsync(req.body);
  res.locals.validatedBody = data;
  next();
 } catch (error) {
  res.status(422).json({
   message: error.message,
   status: "error",
  })
 }
}