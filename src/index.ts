import {MixvelRequest} from "./mixvel/MixvelRequest"
import {MixvelAppData} from "./mixvel/MixvelAppData";
import {GenericNDCMessage} from "./mixvel/request/GenericNDCMessage";

import {AuthParams} from "./request-params/AuthParams";
import {SearchParams} from "./request-params/SearchParams";

import {MixvelAuthAppData} from "./mixvel/MixvelAuthAppData";

import {SearchMessageMapper as MixvelSearchMessageMapper} from "./mixvel/mappers/SearchMessageMapper";

function createMixvelRequest(rq: GenericNDCMessage): MixvelRequest {
    const request = new MixvelRequest(new MixvelAppData<typeof rq>(rq))
    request.url = rq.endpoint
    return request
}

export function getAuthRequest(rq: AuthParams) {
    const request = new MixvelRequest(new MixvelAuthAppData(rq.login, rq.password, rq.structureId))
    request.url = 'api/Accounts/login'
    return request
}

export function getSearchRequest(params: SearchParams): MixvelRequest {
    return createMixvelRequest(new MixvelSearchMessageMapper().map(params))
}
