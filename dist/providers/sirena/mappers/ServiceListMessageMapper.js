"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceListMessageMapper = void 0;
var typeguards_1 = require("../../../core/request/typeguards");
var MethodNotImplemented_1 = require("../../../core/errors/MethodNotImplemented");
var ServiceListRQ_1 = require("../messages/ServiceListRQ");
var ServiceListMessageMapper = /** @class */ (function () {
    function ServiceListMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
        this.message = new ServiceListRQ_1.ServiceListRQ();
        this.message.addParty(credentials);
    }
    ServiceListMessageMapper.prototype.map = function () {
        if ((0, typeguards_1.isPriceParams)(this.params)) {
            return this.createOfferRequest(this.params);
        }
        else {
            throw new MethodNotImplemented_1.MethodNotImplemented("");
        }
    };
    ServiceListMessageMapper.prototype.createOfferRequest = function (params) {
        var paxs = [];
        this.message.Query = {
            Offer: params.offers.map(function (offer) {
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
        this.message.DataLists = { PassengerList: { Passenger: paxs } };
        return this.message;
    };
    return ServiceListMessageMapper;
}());
exports.ServiceListMessageMapper = ServiceListMessageMapper;
