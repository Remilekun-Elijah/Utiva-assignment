const api = require('express').Router();
const user = require('../controllers/user');
const Middleware = require('../middleware/authorization');
const {updateProfileValidator} = require('../middleware/bodyValidator');


api.get("/all", Middleware.validateAuth, Middleware.validateUserAvailability, user.getAllUsers)
api.get('/', Middleware.validateAuth, Middleware.validateUserAvailability, user.getLoggedInUser)
api.get("/:id", Middleware.validateAuth, Middleware.validateUserAvailability, user.getUser)

api.put("/:id", Middleware.validateAuth, Middleware.validateUserAvailability, updateProfileValidator, user.updateUser)
api.delete("/:id", Middleware.validateAuth, Middleware.validateUserAvailability, user.deleteUser)

module.exports = api;