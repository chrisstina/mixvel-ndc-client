import {GenericNDCMessage} from "../messages/GenericNDCMessage";

export interface MixvelMessageMapper {
    params?: Object
    map(): GenericNDCMessage
}