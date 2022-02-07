import { BookParams } from "../../../request/parameters/Book";
import { AbstractParamsValidator } from '../../../request/AbstractParamsValidator';
export declare class BookParamsValidator extends AbstractParamsValidator {
    static validate(props: BookParams): true | never;
}
