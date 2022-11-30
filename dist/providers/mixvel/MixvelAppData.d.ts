import {INDCMessage} from "../../interfaces/INDCMessage";

export declare class MixvelAppData<T extends INDCMessage> {
    [index: string]: {
        $: Record<string, string>;
        Request: T[];
    }[];
    constructor(rq: T);
}
