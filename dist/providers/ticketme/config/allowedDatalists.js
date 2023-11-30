"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedDataLists = void 0;
var datalist_1 = require("../constants/datalist");
exports.allowedDataLists = {
    paxList: datalist_1.PAX,
    contactList: [datalist_1.CONTACT, "ContactInformation"],
    segmentList: datalist_1.SEGMENT,
    flightList: datalist_1.FLIGHT,
    odList: datalist_1.OD,
    priceClassList: datalist_1.PRICECLASS,
    bagList: datalist_1.BAG,
    serviceList: datalist_1.SERVICE,
    fareList: datalist_1.FARE,
    penaltyList: datalist_1.PENALTY,
    descriptionList: datalist_1.DESC,
    seatList: datalist_1.SEAT,
};
