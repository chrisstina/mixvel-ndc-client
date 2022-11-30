import {IRequest} from "../../interfaces/IRequest";
import {IRequestOptions} from "../../interfaces/IRequestOptionsManager";
import {INDCMessage} from "../../interfaces/INDCMessage";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import {MixvelEnvelope} from "./MixvelEnvelope";
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./auth/MixvelAuthAppData";

export declare class MixvelRequest implements IRequest {
    readonly message: MixvelAppData<INDCMessage> | MixvelAuthAppData;
    options: IRequestOptions;
    conversionStrategy?: IConversionStrategy | undefined;
    payload: MixvelEnvelope;
    /**
     * not private because of @see {MixvelAuthRequest}
     * @param message
     * @param options
     * @param conversionStrategy
     */
    constructor(message: MixvelAppData<INDCMessage> | MixvelAuthAppData, options: IRequestOptions, conversionStrategy?: IConversionStrategy | undefined);
    get body(): string | Record<string, unknown> | Promise<Record<string, unknown> | null> | MixvelEnvelope;
    get headers(): {
        [p: string]: any;
    } | undefined;
    addHeader(name: string, contents: string): void;
    getMessageId(): string;
    getMessageTime(): any;
}
