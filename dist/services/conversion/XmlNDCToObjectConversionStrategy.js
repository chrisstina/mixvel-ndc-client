"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlNDCToObjectConversionStrategy = void 0;
var xml2json = require("ndc-xml2json");
var XmlNDCToObjectConversionStrategy = /** @class */ (function () {
    function XmlNDCToObjectConversionStrategy(ndcVersion) {
        this.ndcVersion = ndcVersion;
    }
    XmlNDCToObjectConversionStrategy.prototype.execute = function (payload) {
        var json = xml2json(payload, this.ndcVersion);
        if (json === -1) {
            console.error("xml2json failed to parse response");
            return null;
        }
        return json;
    };
    return XmlNDCToObjectConversionStrategy;
}());
exports.XmlNDCToObjectConversionStrategy = XmlNDCToObjectConversionStrategy;
