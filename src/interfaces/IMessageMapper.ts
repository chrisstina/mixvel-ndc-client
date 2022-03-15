import {INDCMessage} from "./INDCMessage";
import {AbstractRequestParams} from "../core/request/parameters/AbstractRequestParams";

export interface IMessageMapper {
    params?: AbstractRequestParams
    message?: INDCMessage
    map(): INDCMessage
}