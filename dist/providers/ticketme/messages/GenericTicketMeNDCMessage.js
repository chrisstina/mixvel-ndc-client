"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericTicketMeNDCMessage = void 0;
var xmlns_1 = require("../constants/xmlns");
var GenericTicketMeNDCMessage = /** @class */ (function () {
    function GenericTicketMeNDCMessage() {
        this.$ = __assign(__assign({}, this.xmlns), { Version: '17.2' });
        this.Document = {};
        this.Party = [];
    }
    Object.defineProperty(GenericTicketMeNDCMessage.prototype, "nodeName", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GenericTicketMeNDCMessage.prototype, "xmlns", {
        get: function () {
            return xmlns_1.IATAxmlns;
        },
        enumerable: false,
        configurable: true
    });
    GenericTicketMeNDCMessage.prototype.addParty = function (party) {
        this.Party.push({ Sender: [{ TravelAgencySender: [{ AgencyID: [{ _: party.agencyId }] }] }] });
    };
    return GenericTicketMeNDCMessage;
}());
exports.GenericTicketMeNDCMessage = GenericTicketMeNDCMessage;
