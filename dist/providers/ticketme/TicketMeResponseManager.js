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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMeResponseMessage = exports.TicketMeResponseError = exports.TicketMeResponseManager = void 0;
var AbstractResponseManager_1 = require("../../core/response/AbstractResponseManager");
var ResponseParsingError_1 = __importDefault(require("../../core/errors/ResponseParsingError"));
var allowedDatalists_1 = require("./config/allowedDatalists");
var TicketMeDataList_1 = require("./TicketMeDataList");
var TicketMeResponseMapper = /** @class */ (function () {
    function TicketMeResponseMapper() {
    }
    TicketMeResponseMapper.toError = function (errorNode) {
        var _a, _b, _c;
        var errorText = errorNode._ || ((_a = errorNode.$) === null || _a === void 0 ? void 0 : _a.ShortText);
        return new TicketMeResponseError({
            DescText: errorText,
            ErrorType: (_b = errorNode.$) === null || _b === void 0 ? void 0 : _b.Type,
            Code: (_c = errorNode.$) === null || _c === void 0 ? void 0 : _c.Code,
        });
    };
    TicketMeResponseMapper.prototype.map = function (completeResponseObject) {
        if (completeResponseObject == undefined) {
            throw new ResponseParsingError_1.default("Could not find Body node");
        }
        var rootNodeName = Object.keys(completeResponseObject)[0];
        if (!rootNodeName || !completeResponseObject[rootNodeName]) {
            throw new ResponseParsingError_1.default("Could not find root node");
        }
        // Business logic error
        var content = completeResponseObject[rootNodeName];
        if (content !== undefined) {
            var errors = content["ns2:Errors"];
            if (errors && errors.length > 0) {
                return TicketMeResponseMapper.toError(errors[0]["ns2:Error"][0]);
            }
        }
        return completeResponseObject;
    };
    return TicketMeResponseMapper;
}());
var TicketMeResponseManager = /** @class */ (function (_super) {
    __extends(TicketMeResponseManager, _super);
    function TicketMeResponseManager(conversionStrategy) {
        var _this = _super.call(this, conversionStrategy, new TicketMeResponseMapper(), allowedDatalists_1.allowedDataLists) || this;
        _this.conversionStrategy = conversionStrategy;
        return _this;
    }
    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    TicketMeResponseManager.prototype.getResponse = function (rawXML) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.convert(rawXML).then(function (responseObject) {
                        if (responseObject === null) {
                            return Promise.reject(new ResponseParsingError_1.default("Response parsed to an empty object"));
                        }
                        return _this.mapper.map(responseObject);
                    })];
            });
        });
    };
    TicketMeResponseManager.prototype.createDataList = function (title, source, entityName) {
        return TicketMeDataList_1.TicketMeDataList.create(title, source, entityName);
    };
    return TicketMeResponseManager;
}(AbstractResponseManager_1.AbstractResponseManager));
exports.TicketMeResponseManager = TicketMeResponseManager;
var TicketMeResponseError = /** @class */ (function () {
    function TicketMeResponseError(data) {
        this.code = data.Code || "000";
        this.text = data.DescText || "";
    }
    return TicketMeResponseError;
}());
exports.TicketMeResponseError = TicketMeResponseError;
var TicketMeResponseMessage = /** @class */ (function () {
    function TicketMeResponseMessage(data) {
        Object.assign(this, data);
    }
    return TicketMeResponseMessage;
}());
exports.TicketMeResponseMessage = TicketMeResponseMessage;
