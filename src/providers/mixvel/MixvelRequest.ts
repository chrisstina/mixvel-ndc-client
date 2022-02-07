/*
 * Copyright (c) 2021
 */
import {v4 as uuidv4} from 'uuid';

import {IRequest} from "../../interfaces/IRequest";
import {IRequestOptions} from "../../interfaces/IRequestOptionsManager";
import {GenericNDCMessage} from "../../interfaces/GenericNDCMessage";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";

import {MixvelEnvelope} from "./MixvelEnvelope"
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./auth/MixvelAuthAppData";

const {DateTime} = require("luxon")

export class MixvelRequest implements IRequest {
    public payload: MixvelEnvelope

    /**
     * not private because of @see {MixvelAuthRequest}
     * @param message
     * @param options
     * @param conversionStrategy
     */
    constructor(public readonly message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData,
                        public options: IRequestOptions,
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

    get headers() {
        return this.options.headers
    }

    addHeader(name: string, contents: string) {
        if (this.options.headers == undefined) {
            this.options.headers = {}
        }
        this.options.headers[name] = contents
    }

    getMessageId() {
        return uuidv4()
    }

    getMessageTime() {
        return DateTime.now().toISO()
    }
}