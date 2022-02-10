import {
    BAG,
    CONTACT,
    JOURNEY,
    OD,
    PAX,
    PENALTY,
    PRICECLASS,
    SEGMENT,
    SERVICE,
    VALIDATINGPARTY
} from "../constants/datalist";

export const allowedDataLists = {
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
}