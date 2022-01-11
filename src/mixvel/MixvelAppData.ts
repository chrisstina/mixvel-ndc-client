/*
 * Copyright (c) 2021
 */

import {GenericNDCMessage} from "./messages/GenericNDCMessage";

export class MixvelAppData<T extends GenericNDCMessage> {
    [index: string]: {
        $: {},
        Request: T[]
    }[]

    constructor(rq: T) {
        this[rq.nodeName] = []
        this[rq.nodeName].push({
            $: rq.xmlns,
            Request: [rq]
        })
    }
}