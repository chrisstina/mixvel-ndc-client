"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedDataLists = void 0;
var PAX = 'Pax';
var JOURNEY = 'PaxJourney';
var SEGMENT = 'PaxSegment';
var PRICECLASS = 'PriceClass';
var CONTACT = 'ContactInfo';
var SERVICE = 'ServiceDefinition';
var BAG = 'BaggageAllowance';
var VALIDATINGPARTY = 'ValidatingParty';
var OD = 'OriginDest';
var PENALTY = 'Penalty';
exports.allowedDataLists = {
    'paxList': PAX,
    'paxJourneyList': JOURNEY,
    'segmentList': SEGMENT,
    'priceClassList': PRICECLASS,
    'bagList': BAG,
    'validatingPartyList': VALIDATINGPARTY,
    'odList': OD,
    'contactList': CONTACT,
    'serviceList': SERVICE,
    'penaltyList': PENALTY
};
