import { GenericNDCMessage } from "./request/GenericNDCMessage";
import { MixvelEnvelope } from "./MixvelEnvelope";
import { MixvelAppData } from "./MixvelAppData";
import { MixvelAuthAppData } from "./MixvelAuthAppData";
import { IConversionStrategy } from "../services/conversion/IConversionSrategy";
export declare class MixvelRequest {
    readonly message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData;
    readonly conversionStrategy?: IConversionStrategy | undefined;
    url: string;
    method: "GET" | "POST";
    jwt: string;
    payload: MixvelEnvelope;
    constructor(message: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData, conversionStrategy?: IConversionStrategy | undefined);
    /**
     * @return {{method: ("GET"|"POST"), uri: string}}
     */
    get requestOptions(): {
        url: string;
        method: "GET" | "POST";
        jwt: string;
    };
    get body(): string | MixvelEnvelope;
    getMessageId(): string;
    getMessageTime(): any;
}
