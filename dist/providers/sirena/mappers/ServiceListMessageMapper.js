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
        var query, dataLists, shoppingResponseId;
        if ((0, typeguards_1.isPriceParams)(this.params)) {
            query = this.createOfferRequest(this.params);
            dataLists = this.createPaxDataList(this.params);
            shoppingResponseId = this.params.offers[0].responseId;
        }
        else {
            query = this.createOrderRequest(this.params);
        }
        var message = new ServiceListRQ_1.ServiceListRQ(query, dataLists, shoppingResponseId);
        message.addParty(this.credentials);
        return message;
    };
    ServiceListMessageMapper.prototype.createOfferRequest = function (params) {
        return {
            Offers: [
                {
                    Offer: params.offers.map(function (offer) {
                        return {
                            OfferID: [
                                {
                                    $: { Owner: offer.offerOwner || "" },
                                    _: offer.offerId,
                                },
                            ],
                            OfferItemIDs: [
                                {
                                    OfferItemID: offer.offerItems.map(function (item) {
                                        return {
                                            $: { Owner: offer.offerOwner || "" },
                                            _: item.offerItemId,
                                        };
                                    }),
                                },
                            ],
                        };
                    }),
                },
            ],
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
