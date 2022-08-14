const api = require('express').Router();
const auth = require('../controllers/auth');
const { signupValidator, loginValidator, changePasswordValidator, forgotPasswordValidator, resetPasswordValidator } = require('../middleware/bodyValidator');
const { validateAuth, validateUserAvailability } = require('../middleware/authorization');

api.post("/signup", signupValidator, auth.signup)
api.post("/login", loginValidator, auth.login)
api.patch("/change-password", validateAuth, validateUserAvailability, changePasswordValidator, auth.changePassword)
api.post("/forgot-password", forgotPasswordValidator, auth.forgotPassword)
api.patch("/reset-password", resetPasswordValidator, auth.resetPassword)

module.exports = api;