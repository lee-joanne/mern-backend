const express = require('express'); // always need to import in files required
const router = express.Router();
const HttpError = require('../models/http-error')
const placesControllers = require("../controllers/places-controllers");
const { check } = require('express-validator');

router.get('/', placesControllers.getPlacesById);

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.post('/', [check('title').not().isEmpty(), check('description').isLength({min: 5}), check('address').not().isEmpty()], placesControllers.createPlace);

router.patch('/:placeId', [check('title').optional().not().isEmpty(), check('description').optional().not().isEmpty()], placesControllers.patchPlace);

router.delete('/:placeId', placesControllers.deletePlace);

module.exports = router;