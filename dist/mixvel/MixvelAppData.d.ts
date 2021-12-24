import { GenericNDCMessage } from "./request/GenericNDCMessage";
export declare class MixvelAppData<T extends GenericNDCMessage> {
    [index: string]: {
        $: {};
        Request: T[];
    }[];
    constructor(rq: T);
}
