import {MixvelRequest} from "./mixvel/MixvelRequest"
import {MixvelAppData} from "./mixvel/MixvelAppData";
import {GenericNDCMessage} from "./mixvel/request/GenericNDCMessage";

import {XmlConversionStrategy} from "./services/conversion/XmlConversionStrategy";

import {AuthParams} from "./request-params/AuthParams";
import {SearchParams} from "./request-params/SearchParams";
import {PriceParams} from "./request-params/PriceParams";
import {BookParams} from "./request-params/BookParams";

import {MixvelAuthAppData} from "./mixvel/MixvelAuthAppData";

import {SearchMessageMapper as MixvelSearchMessageMapper} from "./mixvel/mappers/SearchMessageMapper";
import {BookMessageMapper as MixvelBookMessageMapper} from "./mixvel/mappers/BookMessageMapper";

import {Mixvel_OfferPriceRQ} from "./mixvel/request/Mixvel_OfferPriceRQ";

const toXML = new XmlConversionStrategy()

function createMixvelRequest(rq: GenericNDCMessage): MixvelRequest {
    const request = new MixvelRequest(new MixvelAppData<typeof rq>(rq), toXML)
    request.url = rq.endpoint
    return request
}

export function getAuthRequest(rq: AuthParams) {
    const request = new MixvelRequest(new MixvelAuthAppData(rq.login, rq.password, rq.structureId), toXML)
    request.url = 'api/Accounts/login'
    return request
}

export function getSearchRequest(params: SearchParams): MixvelRequest {
    return createMixvelRequest(new MixvelSearchMessageMapper(params).map())
}

export function getPriceRequest(params: PriceParams): MixvelRequest {
    return createMixvelRequest(new Mixvel_OfferPriceRQ(params.offerId, params.offerItemIds))
}

export function getBookRequest(params: BookParams): MixvelRequest {
    return createMixvelRequest(new MixvelBookMessageMapper(params).map())
}