import { BookParams } from "../../../core/request/parameters/Book";
import { AbstractParamsValidator } from '../../../core/request/AbstractParamsValidator';
export declare class BookParamsValidator extends AbstractParamsValidator {
    static validate(params: BookParams): null | string;
}
