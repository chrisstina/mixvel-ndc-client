export default class ParamsValidationError extends Error {
    readonly validationError: string;
    private code;
    constructor(validationError: string);
}
