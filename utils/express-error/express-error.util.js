class ExpressError extends Error {  // also be named as AppError
    constructor(message,statusCode){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;