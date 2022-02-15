/*
 * Copyright (c) 2021
 */

import {INDCMessage} from "../../interfaces/INDCMessage";

export class MixvelAppData<T extends INDCMessage> {
    [index: string]: {
        $: Record<string, string>,
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