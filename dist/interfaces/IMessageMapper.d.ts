import {GenericNDCMessage} from "./GenericNDCMessage";
import {AbstractParams} from "../request/parameters/AbstractParams";

export interface IMessageMapper {
    params?: AbstractParams;
    map(): GenericNDCMessage;
}
