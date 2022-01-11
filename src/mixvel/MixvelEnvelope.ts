/*
 * Copyright (c) 2021
 */

import {GenericNDCMessage} from "./messages/GenericNDCMessage";
import {MixvelAppData} from "./MixvelAppData";
import {MixvelAuthAppData} from "./auth/MixvelAuthAppData";

const xmlns = "https://www.mixvel.com/API/XSD/mixvel_envelope/1_06"

export class MixvelEnvelope {
    public "MixEnv:Envelope" = {
        "$": {"xmlns:MixEnv": xmlns},
        "Header": [""],
        "Body": [{
            "MessageInfo": [
                {
                    "$": {
                        "MessageId": "",
                        "TimeSent": ""
                    }
                }
            ],
            "AppData": [{}]
        }]
    }

    set AppData(ndcMessage: MixvelAppData<GenericNDCMessage>|MixvelAuthAppData) {
        this["MixEnv:Envelope"].Body[0].AppData = [ndcMessage]
    }

    set MessageInfo({messageId, timeSent}: {messageId: string, timeSent: string}) {
        this["MixEnv:Envelope"].Body[0].MessageInfo = [{
            "$": {
                "MessageId": messageId,
                "TimeSent": timeSent
            }
        }]
    }
}