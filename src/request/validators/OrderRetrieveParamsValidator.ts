import assert from "assert";
import {AbstractParamsValidator} from "./AbstractParamsValidator";
import {OrderRetrieveParams} from "../parameters";

export class OrderRetrieveParamsValidator  extends AbstractParamsValidator {
    public static validate(props: OrderRetrieveParams) : true | never {
        const {orderId} = props
        assert(orderId.length > 0)
        //@todo is string
        return true
    }
}