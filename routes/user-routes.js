const express = require('express'); // always need to import in files required
const router = express.Router();
const { check } = require('express-validator');
const HttpError = require('../models/http-error')
const usersController = require("../controllers/users-controller");

router.get('/', usersController.getUsersList);
router.post('/signup', [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min: 6})], usersController.signup);
router.post('/login', usersController.login);
router.get('/:userId', usersController.getUser);

module.exports = router;