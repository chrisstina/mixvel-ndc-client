import { IRequest } from "../../interfaces/IRequest";
import { INDCMessage } from "../../interfaces/INDCMessage";
import { IRequestOptions } from "../../interfaces/IRequestOptionsManager";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
export declare type PartyCredentials = {
    agencyId: string;
    contacts?: {
        email: string;
        phone: string;
    };
};
export declare class SirenaRequest implements IRequest {
    readonly message: INDCMessage;
    options: IRequestOptions;
    conversionStrategy?: IConversionStrategy | undefined;
    constructor(message: INDCMessage, options: IRequestOptions, conversionStrategy?: IConversionStrategy | undefined);
    get body(): string | Record<string, unknown> | Promise<Record<string, unknown> | null> | INDCMessage | null;
    get headers(): {
        [p: string]: any;
    } | undefined;
    addHeader(name: string, contents: string): void;
}
