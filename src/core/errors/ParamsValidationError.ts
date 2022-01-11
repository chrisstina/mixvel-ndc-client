class ParamsValidationError extends Error {
    constructor() {
        super();
        this.name = 'ParamsValidationError'
        this.message = `Request parameters are invalid: ${this.message}`
    }
}