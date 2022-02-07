"use strict";
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
exports.MixvelResponseMessage = exports.MixvelResponseError = exports.MixvelResponseManager = void 0;
var ResponseParsingError_1 = __importDefault(require("../../core/errors/ResponseParsingError"));
var MixvelResponseMapper = /** @class */ (function () {
    function MixvelResponseMapper(rootNodeName, allowedResponseNodeNames) {
        this.rootNodeName = rootNodeName;
        this.allowedResponseNodeNames = allowedResponseNodeNames;
    }
    MixvelResponseMapper.prototype.map = function (completeResponseObject) {
        var appData;
        var body = completeResponseObject[this.rootNodeName].Body;
        if (body == undefined) {
            throw new ResponseParsingError_1.default('Could not find Body node');
        }
        // General error
        if (body[0].Error && body[0].Error[0]) {
            return new MixvelResponseError(body[0].Error[0]);
        }
        if (body[0].AppData && body[0].AppData.length > 0) {
            appData = body[0].AppData[0];
        }
        if (appData == undefined) {
            throw new ResponseParsingError_1.default('Could not find AppData node');
        }
        var nodename = Object.keys(appData)[0];
        if (!this.allowedResponseNodeNames.includes(nodename)) {
            throw new ResponseParsingError_1.default("Unknown response node ".concat(nodename));
        }
        var mixvelMessage = appData[nodename][0]; // Enveloped content
        // Business logic error
        var mixvelError = mixvelMessage.Error;
        if (mixvelError && mixvelError[0]) {
            return new MixvelResponseError(mixvelError[0]);
        }
        if (mixvelMessage.Response && mixvelMessage.Response[0]) {
            return new MixvelResponseMessage(mixvelMessage.Response[0]);
        }
        return new MixvelResponseMessage(mixvelMessage);
    };
    return MixvelResponseMapper;
}());
var MixvelResponseManager = /** @class */ (function () {
    function MixvelResponseManager(responseTypes, conversionStrategy) {
        this.responseTypes = responseTypes;
        this.conversionStrategy = conversionStrategy;
        this.rootNodeName = "MixEnv:Envelope";
        this._mapper = new MixvelResponseMapper(this.rootNodeName, this.responseTypes);
    }
    /**
     * @todo currently the response structure depends on a conversion strategy, which is not ok
     * @param rawXML
     */
    MixvelResponseManager.prototype.getResponse = function (rawXML) {
        return __awaiter(this, void 0, void 0, function () {
            var convert;
            var _this = this;
            return __generator(this, function (_a) {
                convert = function (conversionStrategy) {
                    var conversionPromise = conversionStrategy.execute(rawXML);
                    var convertedResult;
                    if (!(conversionPromise instanceof Promise)) {
                        convertedResult = conversionPromise;
                        return Promise.resolve().then(function () { return convertedResult; });
                    }
                    return conversionPromise;
                };
                return [2 /*return*/, convert(this.conversionStrategy).then(function (responseObject) {
                        var _a;
                        if (responseObject === null) {
                            return Promise.reject(new ResponseParsingError_1.default('Response parsed to an empty object'));
                        }
                        if (responseObject[_this.rootNodeName] === undefined
                            || ((_a = responseObject[_this.rootNodeName]) === null || _a === void 0 ? void 0 : _a.Body) === undefined) {
                            return Promise.reject(new ResponseParsingError_1.default('Invalid response format'));
                        }
                        return _this._mapper.map(responseObject);
                    })];
            });
        });
    };
    return MixvelResponseManager;
}());
exports.MixvelResponseManager = MixvelResponseManager;
/**
 * // <ErrorType>InternalServerError</ErrorType>
 // <CanRetry>false</CanRetry>
 // <TicketId>b7348ba4-c300-48f6-8499-acabd8c4596b</TicketId>
 // <Code>MIX-200002</Code>
 // <DescText>Внутренняя ошибка сервиса. Обратитесь в службу технической поддержки (неисправность № b7348ba4-c300-48f6-8499-acabd8c4596b)</DescText>
 */
var MixvelResponseError = /** @class */ (function () {
    function MixvelResponseError(data) {
        this.isMixvelError = true;
        this.ErrorType = data.ErrorType || '';
        this.CanRetry = data.CanRetry === 'true' || false;
        this.TicketId = data.TicketId || '';
        this.Code = data.Code || '000';
        this.DescText = data.DescText || '';
    }
    return MixvelResponseError;
}());
exports.MixvelResponseError = MixvelResponseError;
var MixvelResponseMessage = /** @class */ (function () {
    function MixvelResponseMessage(data) {
        Object.assign(this, data);
    }
    return MixvelResponseMessage;
}());
exports.MixvelResponseMessage = MixvelResponseMessage;
