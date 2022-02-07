import { IRequest } from "../../interfaces/IRequest";
import { IRequestOptions } from "../../interfaces/IRequestOptionsManager";
import { GenericNDCMessage } from "../../interfaces/GenericNDCMessage";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
import { MixvelEnvelope } from "./MixvelEnvelope";
import { MixvelAppData } from "./MixvelAppData";
import { MixvelAuthAppData } from "./auth/MixvelAuthAppData";
export declare class MixvelRequest implements IRequest {
    readonly message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData;
    options: IRequestOptions;
    conversionStrategy?: IConversionStrategy | undefined;
    payload: MixvelEnvelope;
    /**
     * not private because of @see {MixvelAuthRequest}
     * @param message
     * @param options
     * @param conversionStrategy
     */
    constructor(message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData, options: IRequestOptions, conversionStrategy?: IConversionStrategy | undefined);
    get body(): string | Object;
    get headers(): {
        [p: string]: any;
    } | undefined;
    addHeader(name: string, contents: string): void;
    getMessageId(): string;
    getMessageTime(): any;
}
