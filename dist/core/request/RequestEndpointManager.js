"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEndpointManager = void 0;
var RequestGenerationError_1 = require("../errors/RequestGenerationError");
var RequestEndpointManager = /** @class */ (function () {
    function RequestEndpointManager(endpoints) {
        this.endpoints = endpoints;
    }
    RequestEndpointManager.prototype.getEndpointForMessage = function (message) {
        return this.getEndpointByKey(message.constructor.name);
    };
    RequestEndpointManager.prototype.getEndpointByKey = function (id) {
        var endpoint = this.endpoints.get(id);
        if (endpoint !== undefined) {
            return endpoint;
        }
        throw new RequestGenerationError_1.RequestGenerationError("No endpoint found for " + id); // @todo
    };
    return RequestEndpointManager;
}());
exports.RequestEndpointManager = RequestEndpointManager;
