import { GenericNDCMessage } from "../../interfaces/GenericNDCMessage";
import { IEndpointManager } from "../../interfaces/IEndpointManager";
export declare class RequestEndpointManager implements IEndpointManager {
    endpoints: Map<string, string>;
    constructor(endpoints: Map<string, string>);
    getEndpointForMessage(message: GenericNDCMessage): string | never;
    getEndpointByKey(id: string): string | never;
}
