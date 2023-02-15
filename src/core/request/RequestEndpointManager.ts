import {INDCMessage} from "../../interfaces/INDCMessage";
import {RequestGenerationError} from "../errors/RequestGenerationError";
import {IEndpointManager} from "../../interfaces/IEndpointManager";

export class RequestEndpointManager implements IEndpointManager {
  constructor(public endpoints: Map<string, string>) {}

  getEndpointForMessage(message: INDCMessage): string | never {
    return this.getEndpointByKey(message.constructor.name);
  }

  getEndpointByKey(id: string): string | never {
    const endpoint = this.endpoints.get(id);
    if (endpoint) {
      return endpoint;
    }
    throw new RequestGenerationError("No endpoint found for " + id); // @todo
  }
}
