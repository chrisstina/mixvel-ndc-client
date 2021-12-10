/*
 * Copyright (c) 2021
 */

const xml2js = require('xml2js')

/**
 * @typedef MixvelError
 * @property {string[]} ErrorType ["BadRequest"]
 * @property {string[]} CanRetry ["false"]
 * @property {string[]} Code ["MIX-100000"]
 * @property {string[]} DescText ["XML request-params not being recognised/resolved. 'auth' is an undeclared prefix. Line 7, position 8."]
 */

/**
 * @typedef MixvelResponse<NDCResponseMessage>
 * @property {MixvelError} error
 * @property {NDCResponseMessage} ndcMessage
 */
class MixvelResponse {
    /**
     * Async constructor to pre-parse XML into object
     * @param {string} rawXML
     * @param {NDCResponseMessage|null} ndcMessageType
     */
    constructor(rawXML, ndcMessageType = null) {
        this.rawXML = rawXML
        this.ndcMessageType = ndcMessageType
        this.xmlParser = new xml2js.Parser()
        /**
         * @type {Promise} здесь промис парсинга xml в объект
         */
        this.instancePromise = this.fromXML()
    }

    /**
     * @return {Promise<MixvelResponse>}
     */
    get initialized() {
        return this.instancePromise.then(rawJson => {
            /**
             * @type {NDCResponseMessage|undefined}
             */
            this.ndcMessage = rawJson["MixEnv:Envelope"].Body[0].AppData ? rawJson["MixEnv:Envelope"].Body[0].AppData[0] : undefined

            /**
             * @type {MixvelError}
             */
            this.error = rawJson["MixEnv:Envelope"].Body[0].Error ? rawJson["MixEnv:Envelope"].Body[0].Error[0] : undefined
            return this
        })
    }

    /**
     * @return {Promise}
     */
    fromXML() {
        return this.xmlParser.parseStringPromise(this.rawXML)
    }

    set ndcMessage(appData) {
        if (!appData) {
            return
        }
        if (!this.ndcMessageType) {
            return
        }

        try {
            const NDCMessage = this.ndcMessageType
            this._ndcMessage = new NDCMessage(appData)
        } catch (e) {
            console.error(e.stack)
        }
    }

    /**
     * @return {NDCResponseMessage|undefined}
     */
    get ndcMessage() {
        return this._ndcMessage
    }
}

module.exports = MixvelResponse