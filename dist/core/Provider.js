"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
var Provider = /** @class */ (function () {
    /**
     * @param requestManager
     * @param responseManager
     */
    function Provider(requestManager, responseManager) {
        this.requestManager = requestManager;
        this.responseManager = responseManager;
    }
    Object.defineProperty(Provider.prototype, "extraConfiguration", {
        set: function (configuration) {
            this.requestManager.extraConfiguration = configuration;
            // this.responseManager.extraConfiguration = configuration
        },
        enumerable: false,
        configurable: true
    });
    return Provider;
}());
exports.Provider = Provider;
