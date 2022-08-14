const api = require('express').Router();
const auth = require('./auth');
const user = require('./user');

api.use('/auth', auth);
api.use('/user', user);

module.exports = api;