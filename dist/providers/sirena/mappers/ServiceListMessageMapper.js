"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceListMessageMapper = void 0;
var typeguards_1 = require("../../../core/request/typeguards");
var ServiceListRQ_1 = require("../messages/ServiceListRQ");
var ServiceListMessageMapper = /** @class */ (function () {
    function ServiceListMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    ServiceListMessageMapper.prototype.map = function () {
        var query, dataLists;
        if ((0, typeguards_1.isPriceParams)(this.params)) {
            query = this.createOfferRequest(this.params);
            dataLists = this.createPaxDataList(this.params);
        }
        else {
            query = this.createOrderRequest(this.params);
        }
        var message = new ServiceListRQ_1.ServiceListRQ(query, dataLists);
        message.addParty(this.credentials);
        return message;
    };
    ServiceListMessageMapper.prototype.createOfferRequest = function (params) {
        return {
            Offer: params.offers.map(function (offer) {
                return {
                    $: {
                        Owner: offer.offerOwner || "",
                        OfferID: offer.offerId,
                        ResponseID: offer.responseId || "",
                    },
                    OfferItem: offer.offerItems.map(function (item) {
                        return {
                            $: { OfferItemID: item.offerItemId },
                            PassengerRefs: { _: item.paxs || "" },
                        };
                    }),
                };
            }),
        };
    };
    ServiceListMessageMapper.prototype.createPaxDataList = function (params) {
        var paxs = [];
        params.offers.forEach(function (offer) {
            offer.offerItems.forEach(function (item) {
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
            });
        });
        return { PassengerList: { Passenger: paxs } };
    };
    ServiceListMessageMapper.prototype.createOrderRequest = function (params) {
        return {
            OrderID: {
                $: { Owner: params.offerOwner || "" },
                _: params.orderId,
            },
        };
    };
    return ServiceListMessageMapper;
}());
exports.ServiceListMessageMapper = ServiceListMessageMapper;
