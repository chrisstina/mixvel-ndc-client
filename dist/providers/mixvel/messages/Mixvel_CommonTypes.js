"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountableDoc = exports.DirectBill = exports.OtherPaymentMethod = void 0;
var OtherPaymentMethod = /** @class */ (function () {
    function OtherPaymentMethod() {
        return {
            OtherPaymentMethod: null,
        };
    }
    return OtherPaymentMethod;
}());
exports.OtherPaymentMethod = OtherPaymentMethod;
var DirectBill = /** @class */ (function () {
    function DirectBill(billInfo) {
        return {
            DirectBill: {
                BillInfo: billInfo,
            },
        };
    }
    return DirectBill;
}());
exports.DirectBill = DirectBill;
var AccountableDoc = /** @class */ (function () {
    function AccountableDoc(docType, docNumber) {
        if (docNumber === void 0) { docNumber = ""; }
        return {
            AccountableDoc: {
                DocType: docType,
                DocNumber: docNumber,
            },
        };
    }
    return AccountableDoc;
}());
exports.AccountableDoc = AccountableDoc;
