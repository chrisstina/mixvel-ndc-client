import { SearchParams } from "../parameters";
import { AbstractParamsValidator } from "./AbstractParamsValidator";
export declare class SearchParamsValidator extends AbstractParamsValidator {
    static validate(props: SearchParams): true | never;
}
