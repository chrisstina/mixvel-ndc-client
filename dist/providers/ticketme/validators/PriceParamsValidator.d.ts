import { AbstractParamsValidator } from '../../../core/request/AbstractParamsValidator';
import { PriceParams } from "../../../core/request/parameters/Price";
export declare class PriceParamsValidator extends AbstractParamsValidator {
    static validate(params: PriceParams): null | string;
}
