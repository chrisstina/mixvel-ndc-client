import {IResponseMessage} from "./IResponseMessage";
import {IResponseError} from "./IResponseError";

export interface IResponseMapper {
    map(input: Record<string, any>): IResponseMessage | IResponseError
}
