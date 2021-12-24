"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookParams = void 0;
var BookParams = /** @class */ (function () {
    /**
     * @param offerId
     * @param {Map<PaxCategory, Array<string>>} offerItemIds
     * @param passengers
     */
    function BookParams(offerId, offerItemIds, passengers) {
        this.offerId = offerId;
        this.offerItemIds = offerItemIds;
        this.passengers = passengers;
    }
    return BookParams;
}());
exports.BookParams = BookParams;
