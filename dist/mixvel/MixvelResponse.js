"use strict";
/*
 * Copyright (c) 2021
 */
var xml2js = require('xml2js');
/**
 * @typedef MixvelError
 * @property {string[]} ErrorType ["BadRequest"]
 * @property {string[]} CanRetry ["false"]
 * @property {string[]} Code ["MIX-100000"]
 * @property {string[]} DescText ["XML request not being recognised/resolved. 'auth' is an undeclared prefix. Line 7, position 8."]
 */
/**
 * @typedef MixvelResponse<NDCResponseMessage>
 * @property {MixvelError} error
 * @property {NDCResponseMessage} ndcMessage
 */
var MixvelResponse = /** @class */ (function () {
    /**
     * Async constructor to pre-parse XML into object
     * @param {string} rawXML
     * @param {NDCResponseMessage|null} ndcMessageType
     */
    function MixvelResponse(rawXML, ndcMessageType) {
        if (ndcMessageType === void 0) { ndcMessageType = null; }
        this.rawXML = rawXML;
        this.ndcMessageType = ndcMessageType;
        this.xmlParser = new xml2js.Parser();
        /**
         * @type {Promise} здесь промис парсинга xml в объект
         */
        this.instancePromise = this.fromXML();
    }
    Object.defineProperty(MixvelResponse.prototype, "initialized", {
        /**
         * @return {Promise<MixvelResponse>}
         */
        get: function () {
            var _this = this;
            return this.instancePromise.then(function (rawJson) {
                /**
                 * @type {NDCResponseMessage|undefined}
                 */
                _this.ndcMessage = rawJson["MixEnv:Envelope"].Body[0].AppData ? rawJson["MixEnv:Envelope"].Body[0].AppData[0] : undefined;
                /**
                 * @type {MixvelError}
                 */
                _this.error = rawJson["MixEnv:Envelope"].Body[0].Error ? rawJson["MixEnv:Envelope"].Body[0].Error[0] : undefined;
                return _this;
            });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @return {Promise}
     */
    MixvelResponse.prototype.fromXML = function () {
        return this.xmlParser.parseStringPromise(this.rawXML);
    };
    Object.defineProperty(MixvelResponse.prototype, "ndcMessage", {
        /**
         * @return {NDCResponseMessage|undefined}
         */
        get: function () {
            return this._ndcMessage;
        },
        set: function (appData) {
            if (!appData) {
                return;
            }
            if (!this.ndcMessageType) {
                return;
            }
            try {
                var NDCMessage = this.ndcMessageType;
                this._ndcMessage = new NDCMessage(appData);
            }
            catch (e) {
                console.error(e.stack);
            }
        },
        enumerable: false,
        configurable: true
    });
    return MixvelResponse;
}());
module.exports = MixvelResponse;
