import { PriceParams, PriceProps } from "./parameters/Price";
import {
  AbstractRequestParams,
  RequestProps,
} from "./parameters/AbstractRequestParams";
import {
  OrderRetrieveParams,
  OrderRetrieveProps,
} from "./parameters/OrderRetrieve";

export function isPriceProps(
  props: RequestProps<unknown>
): props is PriceProps {
  return (props as PriceProps).offers !== undefined;
}

export function isOrderRetrieveProps(
  props: RequestProps<unknown>
): props is OrderRetrieveProps {
  return (props as OrderRetrieveParams).orderId !== undefined;
}

export function isPriceParams(
  params: AbstractRequestParams
): params is PriceParams {
  return isPriceProps(params);
}

export function isOrderRetrieveParams(
  params: AbstractRequestParams
): params is OrderRetrieveParams {
  return isOrderRetrieveProps(params);
}
