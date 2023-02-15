import { AbstractParamsValidator } from "../../../core/request/AbstractParamsValidator";
import { MixvelBookParams } from "../request/parameters/Book";
export declare class BookParamsValidator extends AbstractParamsValidator {
    static validate(params: MixvelBookParams): null | string;
}
