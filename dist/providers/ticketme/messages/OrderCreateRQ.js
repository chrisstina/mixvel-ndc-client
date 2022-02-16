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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreateRQ = void 0;
var AbstractTicketMeNDCMessage_1 = require("./AbstractTicketMeNDCMessage");
var OrderCreateRQ = /** @class */ (function (_super) {
    __extends(OrderCreateRQ, _super);
    function OrderCreateRQ(offer) {
        var _this = _super.call(this) || this;
        _this.Query = [{
                Order: [{ Offer: [offer] }],
                DataLists: [
                    {
                        PassengerList: [{
                                Passenger: []
                            }],
                        ContactList: [{
                                ContactInformation: []
                            }]
                    }
                ]
            }];
        return _this;
    }
    Object.defineProperty(OrderCreateRQ.prototype, "nodeName", {
        get: function () {
            return "OrderCreateRQ";
        },
        enumerable: false,
        configurable: true
    });
    OrderCreateRQ.prototype.addPax = function (pax, paxContact) {
        this.Query[0].DataLists[0].PassengerList[0].Passenger.push(pax);
        this.Query[0].DataLists[0].ContactList[0].ContactInformation.push(paxContact);
    };
    return OrderCreateRQ;
}(AbstractTicketMeNDCMessage_1.AbstractTicketMeNDCMessage));
exports.OrderCreateRQ = OrderCreateRQ;
