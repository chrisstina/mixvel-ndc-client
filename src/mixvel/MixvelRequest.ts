/*
 * Copyright (c) 2021
 */

import {v4 as uuidv4} from 'uuid';

import {GenericNDCMessage} from "./request/GenericNDCMessage";
import {MixvelEnvelope} from "./MixvelEnvelope"
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./MixvelAuthAppData";

import {XmlConversionStrategy} from "../services/conversion/XmlConversionStrategy";

const {DateTime} = require("luxon")

export class MixvelRequest {
    public url = "/"
    public method: "GET" | "POST" = "POST"
    public jwt = ""
    public payload: MixvelEnvelope

    constructor(public readonly message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData,
                public readonly xmlConversionStrategy?: XmlConversionStrategy) {
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

    toXML(): string {
        if (!this.xmlConversionStrategy) {
            throw new Error('No xml converter found!')
        }
        return this.xmlConversionStrategy.execute(this.payload)
    }

    getMessageId() {
        return uuidv4()
    }

    getMessageTime() {
        return DateTime.now().toISO()
    }
}