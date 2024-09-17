class ApiResponse {
    constructor(statusCode, data, message = "sucess")
    {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}

export {ApiResponse}