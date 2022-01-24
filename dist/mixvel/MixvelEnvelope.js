"use strict";
/*
 * Copyright (c) 2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelEnvelope = void 0;
var xmlns = "https://www.mixvel.com/API/XSD/mixvel_envelope/1_06";
var MixvelEnvelope = /** @class */ (function () {
    function MixvelEnvelope() {
        this["MixEnv:Envelope"] = {
            "$": { "xmlns:MixEnv": xmlns },
            "Header": [""],
            "Body": [{
                    "MessageInfo": [
                        {
                            "$": {
                                "MessageId": "",
                                "TimeSent": ""
                            }
                        }
                    ],
                    "AppData": [{}]
                }]
        };
    }
    Object.defineProperty(MixvelEnvelope.prototype, "AppData", {
        set: function (ndcMessage) {
            this["MixEnv:Envelope"].Body[0].AppData = [ndcMessage];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MixvelEnvelope.prototype, "MessageInfo", {
        set: function (_a) {
            var messageId = _a.messageId, timeSent = _a.timeSent;
            this["MixEnv:Envelope"].Body[0].MessageInfo = [{
                    "$": {
                        "MessageId": messageId,
                        "TimeSent": timeSent
                    }
                }];
        },
        enumerable: false,
        configurable: true
    });
    return MixvelEnvelope;
}());
exports.MixvelEnvelope = MixvelEnvelope;
