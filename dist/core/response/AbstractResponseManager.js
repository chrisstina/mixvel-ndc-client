"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractResponseManager = void 0;
var ResponseParsingError_1 = __importDefault(require("../errors/ResponseParsingError"));
var AbstractResponseManager = /** @class */ (function () {
    function AbstractResponseManager(conversionStrategy, mapper, allowedDatalists) {
        this.conversionStrategy = conversionStrategy;
        this.mapper = mapper;
        this.allowedDatalists = allowedDatalists;
    }
    AbstractResponseManager.prototype.convert = function (rawXML) {
        var conversionPromise = this.conversionStrategy.execute(rawXML);
        var convertedResult;
        if (typeof conversionPromise === "string") {
            throw new ResponseParsingError_1.default("Converted to unexpected type");
        }
        if (!(conversionPromise instanceof Promise)) {
            convertedResult = conversionPromise;
            return Promise.resolve().then(function () { return convertedResult; });
        }
        return conversionPromise;
    };
    AbstractResponseManager.prototype.getResponse = function (rawXML) {
        return Promise.resolve({
            code: "000",
            text: "Not implemented",
        });
    };
    AbstractResponseManager.prototype.createDataList = function (title, source) {
        throw new Error("Not implemented");
    };
    return AbstractResponseManager;
}());
exports.AbstractResponseManager = AbstractResponseManager;
