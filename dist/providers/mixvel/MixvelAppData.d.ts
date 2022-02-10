import { GenericNDCMessage } from "../../interfaces/GenericNDCMessage";
export declare class MixvelAppData<T extends GenericNDCMessage> {
    [index: string]: {
        $: Record<string, string>;
        Request: T[];
    }[];
    constructor(rq: T);
}
