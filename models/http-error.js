class HttpError extends Error {
    constructor (message, errorCode) {
        super(message); // Add a "message" property built in error class
        this.code = errorCode;
    };
};

module.exports = HttpError;