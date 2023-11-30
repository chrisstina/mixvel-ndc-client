"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceMessageMapper = void 0;
var OfferPriceRQ_1 = require("../messages/OfferPriceRQ");
var PriceMessageMapper = /** @class */ (function () {
    function PriceMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new OfferPriceRQ_1.OfferPriceRQ();
        this.message.addParty(credentials);
    }
    PriceMessageMapper.prototype.map = function () {
        var paxs = [];
        this.message.Query = {
            Offer: this.params.offers.map(function (offer) {
                return {
                    $: {
                        Owner: offer.offerOwner || "",
                        OfferID: offer.offerId,
                        ResponseID: offer.responseId || "",
                    },
                    OfferItem: offer.offerItems.map(function (item) {
                        if (item.paxs !== undefined) {
                            paxs.push.apply(paxs, item.paxs.split(" ").map(function (paxId) {
                                return {
                                    $: { PassengerID: paxId },
                                    PTC: [
                                        {
                                            _: item.opts.innerPTC || "ADT",
                                        },
                                    ],
                                };
                            }));
                        }
                        return {
                            $: { OfferItemID: item.offerItemId },
                            PassengerRefs: { _: item.paxs || "" },
                        };
                    }),
                };
            }),
        };
        if (this.params.offers.some(function (offer) {
            return offer.offerItems.some(function (item) { return item.opts.needUpsell; });
        })) {
            this.message.setUpsell();
        }
        this.message.DataLists = { PassengerList: { Passenger: paxs } };
        return this.message;
    };
    return PriceMessageMapper;
}());
exports.PriceMessageMapper = PriceMessageMapper;
