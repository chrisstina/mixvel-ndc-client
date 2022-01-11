/*
 * Copyright (c) 2021
 */
import {v4 as uuidv4} from 'uuid';

import {GenericNDCMessage} from "./messages/GenericNDCMessage";
import {MixvelEnvelope} from "./MixvelEnvelope"
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./auth/MixvelAuthAppData";

import {IConversionStrategy} from "../services/conversion/IConversionSrategy";

const {DateTime} = require("luxon")

export type MixvelRequestOptions = {
    endpoint: string,
    method: "GET" | "POST",
    jwt?: string
}


export class MixvelRequest {
    public payload: MixvelEnvelope

    /**
     * not private because of @see {MixvelAuthRequest}
     * @param message
     * @param options
     * @param conversionStrategy
     */
    constructor(public readonly message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData,
                        public options: MixvelRequestOptions,
                        public conversionStrategy?: IConversionStrategy) {
        this.payload = new MixvelEnvelope()
        this.payload.MessageInfo = {timeSent: this.getMessageTime(), messageId: this.getMessageId()}
        this.payload.AppData = this.message
    }

    get body() {
        if (!this.conversionStrategy) {
            console.debug('No request body output converter found! Return as is')
            return this.payload
        }
        return this.conversionStrategy.execute(this.payload)
    }

    getMessageId() {
        return uuidv4()
    }

    getMessageTime() {
        return DateTime.now().toISO()
    }
}