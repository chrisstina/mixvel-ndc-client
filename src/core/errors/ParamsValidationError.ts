export default class ParamsValidationError extends Error {
    private code: number;
    constructor(public readonly validationError: string) {
        super();
        this.name = 'ParamsValidationError'
        this.code = 400
        this.message = `Request parameters are invalid: \r\n${validationError}`
    }
}