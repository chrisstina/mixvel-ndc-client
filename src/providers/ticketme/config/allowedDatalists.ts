import {
    BAG,
    CONTACT,
    DESC,
    FARE,
    FLIGHT,
    OD,
    PAX,
    PENALTY,
    PRICECLASS,
    SEAT,
    SEGMENT,
    SERVICE,
} from "../constants/datalist";

export const allowedDataLists = {
    'paxList': PAX,
    'contactList': [CONTACT, 'ContactInformation'],
    'segmentList': SEGMENT,
    'flightList': FLIGHT,
    'odList': OD,
    'priceClassList': PRICECLASS,
    'bagList': BAG,
    'serviceList': SERVICE,
    'fareList': FARE,
    'penaltyList': PENALTY,
    'descriptionList': DESC,
    'seatList': SEAT
}