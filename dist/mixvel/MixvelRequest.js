"use strict";
/*
 * Copyright (c) 2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelRequest = void 0;
var uuid_1 = require("uuid");
var MixvelEnvelope_1 = require("./MixvelEnvelope");
var DateTime = require("luxon").DateTime;
var MixvelRequest = /** @class */ (function () {
    function MixvelRequest(message, conversionStrategy) {
        this.message = message;
        this.conversionStrategy = conversionStrategy;
        this.url = "/";
        this.method = "POST";
        this.jwt = "";
        this.payload = new MixvelEnvelope_1.MixvelEnvelope();
        this.payload.MessageInfo = { timeSent: this.getMessageTime(), messageId: this.getMessageId() };
        this.payload.AppData = this.message;
    }
    Object.defineProperty(MixvelRequest.prototype, "requestOptions", {
        /**
         * @return {{method: ("GET"|"POST"), uri: string}}
         */
        get: function () {
            return {
                url: this.url,
                method: this.method,
                jwt: this.jwt
            };
        },
        enumerable: false,
        configurable: true
    });
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
    MixvelRequest.prototype.getMessageId = function () {
        return (0, uuid_1.v4)();
    };
    MixvelRequest.prototype.getMessageTime = function () {
        return DateTime.now().toISO();
    };
    return MixvelRequest;
}());
exports.MixvelRequest = MixvelRequest;
