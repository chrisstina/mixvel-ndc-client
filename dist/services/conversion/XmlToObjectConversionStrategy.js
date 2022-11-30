"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlToObjectConversionStrategy = void 0;
var xml2js = require('xml2js'), xmlParser = new xml2js.Parser();
var XmlToObjectConversionStrategy = /** @class */ (function () {
    function XmlToObjectConversionStrategy() {
    }
    XmlToObjectConversionStrategy.prototype.execute = function (payload) {
        return xmlParser.parseStringPromise(payload);
    };
    return XmlToObjectConversionStrategy;
}());
exports.XmlToObjectConversionStrategy = XmlToObjectConversionStrategy;
