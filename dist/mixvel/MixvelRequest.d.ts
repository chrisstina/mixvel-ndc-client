import { GenericNDCMessage } from "./messages/GenericNDCMessage";
import { MixvelEnvelope } from "./MixvelEnvelope";
import { MixvelAppData } from "./MixvelAppData";
import { MixvelAuthAppData } from "./auth/MixvelAuthAppData";
import { IConversionStrategy } from "../services/conversion/IConversionSrategy";
export declare type MixvelRequestOptions = {
    endpoint: string;
    method: "GET" | "POST";
    headers: {
        [index: string]: string;
    };
};
export declare class MixvelRequest {
    readonly message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData;
    options: MixvelRequestOptions;
    conversionStrategy?: IConversionStrategy | undefined;
    payload: MixvelEnvelope;
    /**
     * not private because of @see {MixvelAuthRequest}
     * @param message
     * @param options
     * @param conversionStrategy
     */
    constructor(message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData, options: MixvelRequestOptions, conversionStrategy?: IConversionStrategy | undefined);
    get body(): string | Object;
    get headers(): {
        [index: string]: string;
    };
    addHeader(name: string, contents: string): void;
    getMessageId(): string;
    getMessageTime(): any;
}
