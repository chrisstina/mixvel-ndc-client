export = MixvelResponse;
/**
 * @typedef MixvelError
 * @property {string[]} ErrorType ["BadRequest"]
 * @property {string[]} CanRetry ["false"]
 * @property {string[]} Code ["MIX-100000"]
 * @property {string[]} DescText ["XML request not being recognised/resolved. 'auth' is an undeclared prefix. Line 7, position 8."]
 */
/**
 * @typedef MixvelResponse<NDCResponseMessage>
 * @property {MixvelError} error
 * @property {NDCResponseMessage} ndcMessage
 */
declare class MixvelResponse {
    /**
     * Async constructor to pre-parse XML into object
     * @param {string} rawXML
     * @param {NDCResponseMessage|null} ndcMessageType
     */
    constructor(rawXML: string, ndcMessageType?: NDCResponseMessage | null);
    rawXML: string;
    ndcMessageType: any;
    xmlParser: any;
    /**
     * @type {Promise} здесь промис парсинга xml в объект
     */
    instancePromise: Promise<any>;
    /**
     * @return {Promise<MixvelResponse>}
     */
    get initialized(): Promise<import("./MixvelResponse")>;
    set ndcMessage(arg: any);
    /**
     * @return {NDCResponseMessage|undefined}
     */
    get ndcMessage(): any;
    /**
     * @type {MixvelError}
     */
    error: MixvelError | undefined;
    /**
     * @return {Promise}
     */
    fromXML(): Promise<any>;
    _ndcMessage: any;
}
declare namespace MixvelResponse {
    export { MixvelError, MixvelResponse };
}
type MixvelError = {
    /**
     * ["BadRequest"]
     */
    ErrorType: string[];
    /**
     * ["false"]
     */
    CanRetry: string[];
    /**
     * ["MIX-100000"]
     */
    Code: string[];
    /**
     * ["XML request not being recognised/resolved. 'auth' is an undeclared prefix. Line 7, position 8."]
     */
    DescText: string[];
};
/**
 * <NDCResponseMessage>
 */
type MixvelResponse = {
    error: MixvelError;
    ndcMessage: NDCResponseMessage;
};
