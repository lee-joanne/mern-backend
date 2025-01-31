const HttpError = require('../models/http-error');
const { validationResult } = require("express-validator");

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skyscrapers in the world.',
        location: {
            lat: 40.123,
            lng: -73.921
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'    
    }
];

const getPlacesById = (req, res, next) => {
    const places = DUMMY_PLACES;
    if (places.length === 0) {
        return next(new HttpError('No places! Make one instead?', 404))
    }
    res.json({places}); // is => { place } => { place: place}
}


const getPlaceById = (req, res, next) => {
    const placeId = req.params.placeId;
    console.log(placeId)
    const places = DUMMY_PLACES.find(p => {
        return p.id === placeId; // returns true
    })
    if (!places) {
        return next(new HttpError('Could not find a place for the provided ID.', 404))
    }
    res.json({places}); // is => { place } => { place: place}
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.userId;
    const places =  DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    })
    if (!places || places.length === 0) {
        return next(new HttpError("Could not find places with the associated user ID.", 404));
    }
    res.json({places});
}

const createPlace = ( req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data.", 422)
    }
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: 'p' + Math.floor(Math.random() * 100),
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator
    };
    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place:createdPlace});
};

const patchPlace = ( req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data.", 422)
    }
    const placeId = req.params.placeId; //
    const { title, description } = req.body;
    const updatedPlace =  {...DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place:updatedPlace});
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.placeId; //
    if (!DUMMY_PLACES.find(p=> p.id === placeId)) {
        throw new HttpError("Could not find a place for that id.", 404)
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => {
        return p.id !== placeId // return true if they do not match
    });
    res.status(200).json({message: "Deleted place."});
}

exports.getPlaceById = getPlaceById;
exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.patchPlace = patchPlace;
exports.deletePlace = deletePlace;

// returns an object