const express = require('express'); // always need to import in files required
const router = express.Router();
const HttpError = require('../models/http-error')
const usersController = require("../controllers/users-controller");

router.get('/', usersController.getUsersList);
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/:userId', usersController.getUser);

module.exports = router;