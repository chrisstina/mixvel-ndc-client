"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelRequest = void 0;
/*
 * Copyright (c) 2021
 */
var uuid_1 = require("uuid");
var MixvelEnvelope_1 = require("./MixvelEnvelope");
var DateTime = require("luxon").DateTime;
var MixvelRequest = /** @class */ (function () {
    /**
     * not private because of @see {MixvelAuthRequest}
     * @param message
     * @param options
     * @param conversionStrategy
     */
    function MixvelRequest(message, options, conversionStrategy) {
        this.message = message;
        this.options = options;
        this.conversionStrategy = conversionStrategy;
        this.payload = new MixvelEnvelope_1.MixvelEnvelope();
        this.payload.MessageInfo = { timeSent: this.getMessageTime(), messageId: this.getMessageId() };
        this.payload.AppData = this.message;
    }
    Object.defineProperty(MixvelRequest.prototype, "body", {
        get: function () {
            if (!this.conversionStrategy) {
                console.debug('No request body output converter found! Return as is');
                return this.payload;
            }
            return this.conversionStrategy.execute(this.payload);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MixvelRequest.prototype, "headers", {
        get: function () {
            return this.options.headers;
        },
        enumerable: false,
        configurable: true
    });
    MixvelRequest.prototype.addHeader = function (name, contents) {
        this.options.headers[name] = contents;
    };
    MixvelRequest.prototype.getMessageId = function () {
        return (0, uuid_1.v4)();
    };
    MixvelRequest.prototype.getMessageTime = function () {
        return DateTime.now().toISO();
    };
    return MixvelRequest;
}());
exports.MixvelRequest = MixvelRequest;
