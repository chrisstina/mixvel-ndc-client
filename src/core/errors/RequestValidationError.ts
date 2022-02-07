export class RequestValidationError extends Error {
    constructor(message: string) {
        super();
        this.name = 'RequestValidationError'
        this.message = `RequestValidationError: ${message}`
    }
}