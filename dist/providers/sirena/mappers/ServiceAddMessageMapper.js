"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceAddMessageMapper = void 0;
var OrderChangeRQ_1 = require("../messages/OrderChangeRQ");
var commonMappers_1 = require("../../ticketme/mappers/commonMappers");
var ptc_1 = require("./dictionary/ptc");
var ServiceAddMessageMapper = /** @class */ (function () {
    function ServiceAddMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    ServiceAddMessageMapper.prototype.map = function () {
        var _this = this;
        var message = new OrderChangeRQ_1.OrderChangeRQ(this.params.orderId, this.params.orderOwner);
        message.Query[0].OrderServicing = [
            {
                AcceptOffer: [
                    {
                        Offer: this.params.offers.map(function (offer) {
                            var _a;
                            var changeOffer = new OrderChangeRQ_1.OrderChangeOffer(offer.responseId || "", offer.offerOwner || "", offer.offerId);
                            (_a = changeOffer.OfferItem).push.apply(_a, offer.offerItems.map(function (item) {
                                return new OrderChangeRQ_1.OrderChangeOfferItem(item.offerItemId, item.paxRefs.join(" "), item.segmentRefs.join(" "), item.quantity);
                            }));
                            return changeOffer;
                        }),
                    },
                ],
            },
        ];
        if (this.params.passengers) {
            message.DataLists[0].PassengerList = [
                {
                    Passenger: this.params.passengers.map(function (passenger) {
                        return _this.passengerToPax(passenger);
                    }),
                },
            ];
        }
        message.addParty(this.credentials);
        return message;
    };
    ServiceAddMessageMapper.prototype.passengerToPax = function (passenger) {
        var individual = {
            GivenName: [{ _: passenger.personalInfo.firstName }],
            Surname: [{ _: passenger.personalInfo.lastName }],
            Birthdate: [{ _: (0, commonMappers_1.toTicketMeDate)(passenger.personalInfo.dob) }],
            Gender: [{ _: (0, commonMappers_1.toTicketMeGender)(passenger.personalInfo.gender) }],
        };
        if (passenger.personalInfo.middleName) {
            individual["MiddleName"] = [
                { _: passenger.personalInfo.middleName || "" },
            ];
        }
        return new OrderChangeRQ_1.OrderPax(passenger.id || "", (0, ptc_1.toSirena)(passenger.ptc), individual, passenger.infantRef);
    };
    return ServiceAddMessageMapper;
}());
exports.ServiceAddMessageMapper = ServiceAddMessageMapper;
