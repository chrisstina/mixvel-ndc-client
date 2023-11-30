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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FareRulesRQ = void 0;
var AbstractSirenaNDCMessage_1 = require("./AbstractSirenaNDCMessage");
var FareRulesRQ = /** @class */ (function (_super) {
    __extends(FareRulesRQ, _super);
    function FareRulesRQ() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Query = [
            {
                Departure: [],
                Arrival: [],
                AirlineID: [],
                FareBasisCode: [],
                FareReferenceKey: [],
            },
        ];
        _this.Metadata = [];
        return _this;
    }
    Object.defineProperty(FareRulesRQ.prototype, "nodeName", {
        get: function () {
            return "FareRulesRQ";
        },
        enumerable: false,
        configurable: true
    });
    return FareRulesRQ;
}(AbstractSirenaNDCMessage_1.AbstractSirenaNDCMessage));
exports.FareRulesRQ = FareRulesRQ;
