export abstract class AbstractParamsValidator {
    /**
     * @throws {ParamsValidationError}
     * @param params
     */
    static validate(params: object): true|never {
        return true
    }
}
