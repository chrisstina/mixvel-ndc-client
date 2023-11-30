"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixvel_ServiceListRQ = void 0;
var Mixvel_ServiceListRQ = /** @class */ (function () {
    function Mixvel_ServiceListRQ(CoreRequest) {
        this.CoreRequest = CoreRequest;
    }
    Object.defineProperty(Mixvel_ServiceListRQ.prototype, "xmlns", {
        get: function () {
            return {
                "xmlns:Service": "https://www.mixvel.com/API/XSD/Mixvel_ServiceListRQ/1_00",
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mixvel_ServiceListRQ.prototype, "nodeName", {
        get: function () {
            return "Service:Mixvel_ServiceListRQ";
        },
        enumerable: false,
        configurable: true
    });
    return Mixvel_ServiceListRQ;
}());
exports.Mixvel_ServiceListRQ = Mixvel_ServiceListRQ;
