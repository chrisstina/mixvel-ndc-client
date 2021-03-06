import {INDCMessage} from "../../../interfaces/INDCMessage";

export class Mixvel_OrderReshopRQ implements INDCMessage {
    get xmlns() {
        return {"xmlns:Reshop": "https://www.mixvel.com/API/XSD/Mixvel_OrderReshopRQ/1_00"}
    }

    get nodeName() {
        return "Reshop:Mixvel_OrderReshopRQ"
    }

    public MixOrder: Record<string, unknown>

    constructor(offerId: string) {
        this.MixOrder = {MixOrderID: offerId}
    }
}