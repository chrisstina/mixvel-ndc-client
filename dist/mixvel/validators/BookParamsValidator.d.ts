import { AbstractParamsValidator } from "../../request/validators/AbstractParamsValidator";
import { BookParams } from "../../request/parameters";
export declare class BookParamsValidator extends AbstractParamsValidator {
    static validate(props: BookParams): true | never;
}
