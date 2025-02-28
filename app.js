const express = require('express');
const app = express();
const HttpError = require('./models/http-error');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/user-routes');

const port = 8000;

app.use(express.json());
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes); 
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
})
app.listen(port);
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message})
})