"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceMessageMapper = void 0;
var OfferPriceRQ_1 = require("../messages/OfferPriceRQ");
var PriceMessageMapper = /** @class */ (function () {
    function PriceMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    PriceMessageMapper.prototype.map = function () {
        var paxs = [];
        var offers = this.params.offers.map(function (offer) {
            return {
                $: { Owner: offer.offerOwner || '', OfferID: offer.offerId, ResponseID: offer.responseId || '' },
                OfferItem: offer.offerItems.map(function (item) {
                    if (item.paxs !== undefined) {
                        paxs.push.apply(paxs, item.paxs.split(' ').map(function (paxId) {
                            return { Passenger: { $: { PassengerID: paxId } } };
                        }));
                    }
                    return {
                        $: { OfferItemID: item.offerItemId },
                        PassengerRefs: { _: item.paxs || '' }
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
