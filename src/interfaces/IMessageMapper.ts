import {INDCMessage} from "./INDCMessage";
import {AbstractRequestParams} from "../core/request/parameters/AbstractRequestParams";

export interface IMessageMapper {
    params?: AbstractRequestParams
    map(): INDCMessage
}