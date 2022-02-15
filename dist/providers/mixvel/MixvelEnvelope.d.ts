import { INDCMessage } from "../../interfaces/INDCMessage";
import { MixvelAppData } from "./MixvelAppData";
import { MixvelAuthAppData } from "./auth/MixvelAuthAppData";
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
    set AppData(ndcMessage: MixvelAppData<INDCMessage> | MixvelAuthAppData);
    set MessageInfo({ messageId, timeSent }: {
        messageId: string;
        timeSent: string;
    });
}
