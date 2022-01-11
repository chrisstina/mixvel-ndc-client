import { AbstractParamsValidator } from "../../request/validators/AbstractParamsValidator";
import { SearchParams } from "../../request/parameters";
export declare class SearchParamsValidator extends AbstractParamsValidator {
    static validate(props: SearchParams): true | never;
}
