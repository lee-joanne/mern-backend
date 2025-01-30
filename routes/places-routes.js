const express = require('express'); // always need to import in files required
const router = express.Router();
const HttpError = require('../models/http-error')
const placesControllers = require("../controllers/places-controllers");

router.get('/', placesControllers.getPlacesById);

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.post('/', placesControllers.createPlace);

router.patch('/:placeId', placesControllers.patchPlace);

router.delete('/:placeId', placesControllers.deletePlace);

module.exports = router;