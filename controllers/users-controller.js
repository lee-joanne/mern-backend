const HttpError = require('../models/http-error')

let DUMMY_USERS = [
    {
        first_name: "Joanne",
        last_name: "Lee",
        creator: 'u1',
        email: "test@test.com",
        password: "testers"
    }
];

const getUsersList = (req, res, next) => {
    const users = DUMMY_USERS;
    if (users.length === 0) {
        return next(new HttpError('No places! Make one instead?', 404))
    }
    res.json({users}); // is => { place } => { place: place}
}

const getUser = (req, res, next) => {
    const userId = req.params.userId
    const users = DUMMY_USERS.find(u => {
        return u.creator === userId;
    })
    if (!users || users.length === 0) {
        return next(new HttpError('Could not find a user for the provided ID.', 404))
    }
    res.json({users});
}

const signup = (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    const newUser = {
        first_name: first_name,
        last_name: last_name,
        creator: 'u' + Math.floor(Math.random() * 100),
        email: email,   
        password: password
    }
    const existingUser = DUMMY_USERS.find(user => user.email === email);
    if (existingUser) {
        throw new HttpError("An account with this email address is already made. Please login or make a new account with a different email.", 409)
    }
    res.status(201).json({user:newUser});
    DUMMY_USERS.push(newUser);
};

const login = (req, res, next) => {
    const {email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => {
        return u.email === email; // returns the first element in the array that satifies the condition.
    })
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Credentials seem to be incomplete, please try again", 401)
    }
    res.json({message: "Logged in!"});
};

exports.getUsersList = getUsersList;
exports.getUser = getUser;
exports.signup = signup;
exports.login = login;