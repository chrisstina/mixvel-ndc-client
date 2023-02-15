"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestOptionsManager = void 0;
var RequestOptionsManager = /** @class */ (function () {
    function RequestOptionsManager() {
    }
    RequestOptionsManager.prototype.create = function (params) {
        return {
            endpoint: params.endpoint,
            method: params.method || "POST",
            headers: params.headers || {
                accept: "application/xml",
                "Content-Type": "application/xml",
            },
        };
    };
    return RequestOptionsManager;
}());
exports.RequestOptionsManager = RequestOptionsManager;
