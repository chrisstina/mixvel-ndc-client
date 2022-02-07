import {IRequest} from "../../interfaces/IRequest";
import {GenericNDCMessage} from "../../interfaces/GenericNDCMessage";
import {IRequestOptions} from "../../interfaces/IRequestOptionsManager";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";

export type PartyCredentials = { agencyId: string }

export class TicketMeRequest implements IRequest {
    constructor(public readonly message: GenericNDCMessage,
                public options: IRequestOptions,
                public conversionStrategy?: IConversionStrategy) {
        this.options = options;
    }

    get body() {
        if (!this.conversionStrategy) {
            console.debug('No request body output converter found! Return as is')
            return this.message
        }
        const obj: {[key: string]: GenericNDCMessage} = {}
        obj[this.message.nodeName] = this.message
        return this.conversionStrategy.execute(obj)
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
}