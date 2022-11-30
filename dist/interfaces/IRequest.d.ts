import {IConversionStrategy} from "../services/conversion/IConversionSrategy";
import {IRequestOptions} from "./IRequestOptionsManager";

export interface IRequest {
    conversionStrategy?: IConversionStrategy;
    options: IRequestOptions;
    readonly body: any;
    readonly headers?: {
        [p: string]: string;
    };
    addHeader(name: string, contents: string): void;
}
