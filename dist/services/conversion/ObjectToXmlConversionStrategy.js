"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectToXmlConversionStrategy = void 0;
var xml2js = require("xml2js");
var ObjectToXmlConversionStrategy = /** @class */ (function () {
    function ObjectToXmlConversionStrategy() {
        this.xmlBuilder = new xml2js.Builder();
    }
    ObjectToXmlConversionStrategy.prototype.execute = function (payload) {
        return this.xmlBuilder.buildObject(payload);
    };
    return ObjectToXmlConversionStrategy;
}());
exports.ObjectToXmlConversionStrategy = ObjectToXmlConversionStrategy;
