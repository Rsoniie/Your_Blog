
class ApiError extends Error {
    constructor(statusCode, message = "Some thing went wrong", errors=[])
    {
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}

export {ApiError}