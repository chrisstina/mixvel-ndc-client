"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectToXmlNDCConversionStrategy = void 0;
var json2xml = require("ndc-json2xml");
/**
 * Uses IATA NDC JSON to XML converter, compatible to NDC versions up to 18.2
 */
var ObjectToXmlNDCConversionStrategy = /** @class */ (function () {
    /**
     * @param {string} ndcVersion e.g. 172 for NDC 17.2, 182 for NDC 18.2
     */
    function ObjectToXmlNDCConversionStrategy(ndcVersion) {
        this.ndcVersion = ndcVersion;
    }
    ObjectToXmlNDCConversionStrategy.prototype.execute = function (payload) {
        var xmlPayload = json2xml(payload, this.ndcVersion);
        if (xmlPayload === -1) {
            console.error("json2xml failed to create request");
            return null;
        }
        return xmlPayload;
    };
    return ObjectToXmlNDCConversionStrategy;
}());
exports.ObjectToXmlNDCConversionStrategy = ObjectToXmlNDCConversionStrategy;
