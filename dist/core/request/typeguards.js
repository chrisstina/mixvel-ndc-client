"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOrderRetrieveParams = exports.isPriceParams = exports.isOrderRetrieveProps = exports.isPriceProps = void 0;
function isPriceProps(props) {
    return props.offers !== undefined;
}
exports.isPriceProps = isPriceProps;
function isOrderRetrieveProps(props) {
    return props.orderId !== undefined;
}
exports.isOrderRetrieveProps = isOrderRetrieveProps;
function isPriceParams(params) {
    return isPriceProps(params);
}
exports.isPriceParams = isPriceParams;
function isOrderRetrieveParams(params) {
    return isOrderRetrieveProps(params);
}
exports.isOrderRetrieveParams = isOrderRetrieveParams;
