"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstAvailableEmailService = void 0;
var FirstAvailableEmailService = /** @class */ (function () {
    function FirstAvailableEmailService() {
    }
    FirstAvailableEmailService.getFirstAvailableEmail = function (params) {
        for (var passengersKey in params.passengers) {
            if (params.passengers[passengersKey].contacts.email !== undefined) {
                return params.passengers[passengersKey].contacts.email;
            }
        }
    };
    return FirstAvailableEmailService;
}());
exports.FirstAvailableEmailService = FirstAvailableEmailService;
