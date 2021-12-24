"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlConversionStrategy = void 0;
var xml2js = require('xml2js');
var XmlConversionStrategy = /** @class */ (function () {
    function XmlConversionStrategy() {
        this.xmlBuilder = new xml2js.Builder();
    }
    XmlConversionStrategy.prototype.execute = function (payload) {
        return this.xmlBuilder.buildObject(payload);
    };
    return XmlConversionStrategy;
}());
exports.XmlConversionStrategy = XmlConversionStrategy;
