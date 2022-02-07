import {GenericNDCMessage} from "./GenericNDCMessage";

export interface IEndpointManager {
    endpoints: Map<string, string>;

    getEndpointForMessage(message: GenericNDCMessage): string | never;

    getEndpointByKey(id: string): string | never;
}