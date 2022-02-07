import { GenericNDCMessage } from "./GenericNDCMessage";
export interface IMessageMapper {
    params?: Object;
    map(): GenericNDCMessage;
}
