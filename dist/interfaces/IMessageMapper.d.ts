import { INDCMessage } from "./INDCMessage";
import { AbstractParams } from "../core/request/parameters/AbstractParams";
export interface IMessageMapper {
    params?: AbstractParams;
    map(): INDCMessage;
}
