import {PriceParams, PriceProps} from "./parameters/Price";
import {AbstractRequestParams, RequestProps} from "./parameters/AbstractRequestParams";
import {OrderRetrieveParams, OrderRetrieveProps} from "./parameters/OrderRetrieve";

export declare function isPriceProps(props: RequestProps<any>): props is PriceProps;
export declare function isOrderRetrieveProps(props: RequestProps<any>): props is OrderRetrieveProps;
export declare function isPriceParams(params: AbstractRequestParams): params is PriceParams;
export declare function isOrderRetrieveParams(params: AbstractRequestParams): params is OrderRetrieveParams;
