/*
 * Copyright (c) 2021
 */

import {v4 as uuidv4} from 'uuid';

import {GenericNDCMessage} from "./request/GenericNDCMessage";
import {MixvelEnvelope} from "./MixvelEnvelope"
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./MixvelAuthAppData";

import {IConversionStrategy} from "../services/conversion/IConversionSrategy";

const {DateTime} = require("luxon")

export class MixvelRequest {
    public url = "/"
    public method: "GET" | "POST" = "POST"
    public jwt = ""
    public payload: MixvelEnvelope

    constructor(public readonly message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData,
                public readonly conversionStrategy?: IConversionStrategy) {
        this.payload = new MixvelEnvelope()
        this.payload.MessageInfo = {timeSent: this.getMessageTime(), messageId: this.getMessageId()}
        this.payload.AppData = this.message
    }

    /**
     * @return {{method: ("GET"|"POST"), uri: string}}
     */
    get requestOptions() {
        return {
            url: this.url,
            method: this.method,
            jwt: this.jwt
        }
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