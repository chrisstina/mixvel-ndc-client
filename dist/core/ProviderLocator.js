"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderLocator = void 0;
var ProviderLocator = /** @class */ (function () {
    function ProviderLocator() {
    }
    ProviderLocator.get = function (providerCode) {
        var provider = ProviderLocator.providers.get(providerCode);
        if (provider === undefined) {
            throw new Error('No provider found for code' + providerCode);
        }
        return provider;
    };
    ProviderLocator.register = function (providerCode, provider) {
        ProviderLocator.providers.set(providerCode, provider);
    };
    ProviderLocator.providers = new Map();
    return ProviderLocator;
}());
exports.ProviderLocator = ProviderLocator;
