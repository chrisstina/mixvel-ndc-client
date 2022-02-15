import {INDCMessage} from "./INDCMessage";

export interface IEndpointManager {
    endpoints: Map<string, string>;

    getEndpointForMessage(message: INDCMessage): string | never;

    getEndpointByKey(id: string): string | never;
}