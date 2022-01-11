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
exports.SearchParamsValidator = void 0;
var assert_1 = __importDefault(require("assert"));
var AbstractParamsValidator_1 = require("./AbstractParamsValidator");
var SearchParamsValidator = /** @class */ (function (_super) {
    __extends(SearchParamsValidator, _super);
    function SearchParamsValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchParamsValidator.validate = function (props) {
        var originDestinations = props.originDestinations, travelers = props.travelers, cabin = props.cabin, preferredCarriers = props.preferredCarriers;
        (0, assert_1.default)(originDestinations.length > 0);
        (0, assert_1.default)(travelers.length > 0);
        //@todo
        return true;
    };
    return SearchParamsValidator;
}(AbstractParamsValidator_1.AbstractParamsValidator));
exports.SearchParamsValidator = SearchParamsValidator;
