/*
 * Copyright (c) 2021
 */

import { v4 as uuidv4 } from 'uuid';

import {GenericNDCMessage} from "./request/GenericNDCMessage";
import {MixvelEnvelope} from "./MixvelEnvelope"
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./MixvelAuthAppData";

const {DateTime} = require("luxon"),
    xml2js = require('xml2js')

export class MixvelRequest {
    private xmlBuilder = new xml2js.Builder()
    public url = "/"
    public method: "GET"|"POST" = "POST"
    public jwt = ""
    public payload: MixvelEnvelope

    constructor(public readonly message: MixvelAppData<GenericNDCMessage>|MixvelAuthAppData) {
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

    /**
     * @return {string} XML
     * @todo move out XML lib as a dependency maybe
     */
    toXML() {
        return this.xmlBuilder.buildObject(this.payload)
    }

    getMessageId() {
        return uuidv4()
    }

    getMessageTime() {
        return DateTime.now().toISO()
    }
}