"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceMessageMapper = void 0;
var OfferPriceRQ_1 = require("../messages/OfferPriceRQ");
var assert_1 = __importDefault(require("assert"));
var PriceMessageMapper = /** @class */ (function () {
    function PriceMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    PriceMessageMapper.prototype.map = function () {
        var paxs = [];
        var offers = this.params.offers.map(function (offer) {
            (0, assert_1.default)(offer.offerOwner, 'Missing offer owner');
            (0, assert_1.default)(offer.offerId, 'Missing offer id');
            (0, assert_1.default)(offer.responseId, 'Missing response id');
            return {
                $: { Owner: offer.offerOwner, OfferID: offer.offerId, ResponseID: offer.responseId },
                OfferItem: offer.offerItems.map(function (item) {
                    (0, assert_1.default)(item.offerItemId !== undefined, 'Missing offer item id');
                    (0, assert_1.default)(item.paxs !== undefined, 'Missing offer item paxs');
                    paxs.push.apply(paxs, item.paxs.split(' ').map(function (paxId) {
                        return { Passenger: { $: { PassengerID: paxId } } };
                    }));
                    return {
                        $: { OfferItemID: item.offerItemId },
                        PassengerRefs: { _: item.paxs }
                    };
                })
            };
        });
        var ticketMeOfferPriceRQ = new OfferPriceRQ_1.OfferPriceRQ(offers, { PassengerList: paxs });
        ticketMeOfferPriceRQ.addParty(this.credentials);
        return ticketMeOfferPriceRQ;
    };
    return PriceMessageMapper;
}());
exports.PriceMessageMapper = PriceMessageMapper;
