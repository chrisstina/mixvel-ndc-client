import { IRequest } from "../../interfaces/IRequest";
import { GenericNDCMessage } from "../../interfaces/GenericNDCMessage";
import { IRequestOptions } from "../../interfaces/IRequestOptionsManager";
import { IConversionStrategy } from "../../services/conversion/IConversionSrategy";
export declare type PartyCredentials = {
    agencyId: string;
};
export declare class TicketMeRequest implements IRequest {
    readonly message: GenericNDCMessage;
    options: IRequestOptions;
    conversionStrategy?: IConversionStrategy | undefined;
    constructor(message: GenericNDCMessage, options: IRequestOptions, conversionStrategy?: IConversionStrategy | undefined);
    get body(): string | Record<string, unknown> | Promise<Record<string, unknown> | null> | GenericNDCMessage;
    get headers(): {
        [p: string]: any;
    } | undefined;
    addHeader(name: string, contents: string): void;
}
