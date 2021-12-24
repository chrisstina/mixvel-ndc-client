import { GenericNDCMessage } from "./request/GenericNDCMessage";
import { MixvelAppData } from "./MixvelAppData";
import { MixvelAuthAppData } from "./MixvelAuthAppData";
export declare class MixvelEnvelope {
    "MixEnv:Envelope": {
        $: {
            "xmlns:MixEnv": string;
        };
        Header: string[];
        Body: {
            MessageInfo: {
                $: {
                    MessageId: string;
                    TimeSent: string;
                };
            }[];
            AppData: {}[];
        }[];
    };
    set AppData(ndcMessage: MixvelAppData<GenericNDCMessage> | MixvelAuthAppData);
    set MessageInfo({ messageId, timeSent }: {
        messageId: string;
        timeSent: string;
    });
}
