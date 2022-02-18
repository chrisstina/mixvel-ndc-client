import {IDataList} from "../../interfaces/IDataList";
import {IResponseManager} from "../../interfaces/IResponseManager";
import {IResponseMapper} from "../../interfaces/IResponseMapper";
import {IResponseError} from "../../interfaces/IResponseError";
import {IResponseMessage} from "../../interfaces/IResponseMessage";
import {IConversionStrategy} from "../../services/conversion/IConversionSrategy";
import ResponseParsingError from "../errors/ResponseParsingError";

export abstract class AbstractResponseManager implements IResponseManager {
    protected constructor(public conversionStrategy: IConversionStrategy,
                          protected readonly mapper: IResponseMapper,
                          public readonly allowedDatalists: Record<string, string|string[]>) {
    }

    convert(rawXML: string): Promise<Record<string, any> | null> {
        const conversionPromise = this.conversionStrategy.execute(rawXML);
        let convertedResult: Record<string, unknown> | null;

        if (typeof conversionPromise === "string") {
            throw new ResponseParsingError('Converted to unexpected type')
        }

        if (!(conversionPromise instanceof Promise)) {
            convertedResult = conversionPromise;
            return Promise.resolve().then(() => convertedResult);
        }
        return conversionPromise;
    }

    getResponse(rawXML: string): Promise<IResponseMessage | IResponseError> {
        return Promise.resolve({
            code: '000',
            text: 'Not implemented'
        });
    }

    createDataList(title: string, source: Record<string, unknown>[]): IDataList {
        throw new Error('Not implemented')
    }
}