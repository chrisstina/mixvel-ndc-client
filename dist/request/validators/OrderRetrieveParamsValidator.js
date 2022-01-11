"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRetrieveParamsValidator = void 0;
var assert_1 = __importDefault(require("assert"));
var AbstractParamsValidator_1 = require("./AbstractParamsValidator");
var OrderRetrieveParamsValidator = /** @class */ (function (_super) {
    __extends(OrderRetrieveParamsValidator, _super);
    function OrderRetrieveParamsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderRetrieveParamsValidator.validate = function (props) {
        var orderId = props.orderId;
        (0, assert_1.default)(orderId.length > 0);
        //@todo is string
        return true;
    };
    return OrderRetrieveParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.OrderRetrieveParamsValidator = OrderRetrieveParamsValidator;
