"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlineProfileMessageMapper = void 0;
var AirlineProfileRQ_1 = require("../messages/AirlineProfileRQ");
var AirlineProfileMessageMapper = /** @class */ (function () {
    function AirlineProfileMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new AirlineProfileRQ_1.AirlineProfileRQ(this.params.airlineCode);
        this.message.addParty(this.credentials);
    }
    AirlineProfileMessageMapper.prototype.map = function () {
        return this.message;
    };
    return AirlineProfileMessageMapper;
}());
exports.AirlineProfileMessageMapper = AirlineProfileMessageMapper;
