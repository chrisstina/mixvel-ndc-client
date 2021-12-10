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
    console.log(request.toXML())

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

createMixvelRequest(new MixvelSearchMessageMapper().map({
    travelers: [
        {ptc: 'ADULT', age: "30", id: "1"},
        {ptc: 'CHILD', age: "5", id: "2"}
    ],
    originDestinations: [
        {from: "LED", to: "MOW", dateRangeEnd: "2021-12-12", dateRangeStart: "2021-12-12"},
        {from: "MOW", to: "LED", dateRangeEnd: "2021-12-15", dateRangeStart: "2021-12-15"}
    ],
    cabin: "ECONOMY"
}))
