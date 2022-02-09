import {GenericNDCMessage} from "./GenericNDCMessage";
import {AbstractParams} from "../core/request/parameters/AbstractParams";

export interface IMessageMapper {
    params?: AbstractParams;
    map(): GenericNDCMessage;
}
