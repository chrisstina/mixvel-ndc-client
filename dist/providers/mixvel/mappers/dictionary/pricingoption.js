"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMixvel = exports.Mixvel_PricingOption = void 0;
var Mixvel_PricingOption;
(function (Mixvel_PricingOption) {
    Mixvel_PricingOption["LOWEST_FARE"] = "Simple";
    Mixvel_PricingOption["ALL_FARES"] = "Extended";
})(Mixvel_PricingOption = exports.Mixvel_PricingOption || (exports.Mixvel_PricingOption = {}));
function toMixvel(pricingOption) {
    return Mixvel_PricingOption[pricingOption];
}
exports.toMixvel = toMixvel;
