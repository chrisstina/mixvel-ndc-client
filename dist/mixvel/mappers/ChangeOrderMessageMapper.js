"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeOrderMessageMapper = void 0;
var assert_1 = __importDefault(require("assert"));
var Mixvel_OrderChangeRQ_1 = require("../request/Mixvel_OrderChangeRQ");
var ChangeOrderMessageMapper = /** @class */ (function () {
    function ChangeOrderMessageMapper(params) {
        this.params = params;
    }
    ChangeOrderMessageMapper.prototype.map = function () {
        return new Mixvel_OrderChangeRQ_1.Mixvel_OrderChangeRQ(this.params.orderId, { amount: this.params.payment.amount.toString(), currency: this.params.payment.currency }, createFOP(this.params.formOfPayment));
    };
    return ChangeOrderMessageMapper;
}());
exports.ChangeOrderMessageMapper = ChangeOrderMessageMapper;
function createFOP(_a) {
    var type = _a.type, data = _a.data;
    switch (type) {
        case "BILL":
            (0, assert_1.default)(typeof data === "string", "Data for BILL FOR must be string");
            return new Mixvel_OrderChangeRQ_1.DirectBill(data);
        case "CASH":
            return new Mixvel_OrderChangeRQ_1.OtherPaymentMethod();
        case "CARD":
            throw new Error("CARD FOP not implemented yet");
        default:
            throw new Error("Invalid FOP ".concat(type, " given. \"BILL\" or \"CASH\" expected"));
    }
}
