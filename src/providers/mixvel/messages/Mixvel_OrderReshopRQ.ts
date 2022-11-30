import {INDCMessage} from "../../../interfaces/INDCMessage";

type UpdateOrder = { CancelOrder: { OrderRefID: string[] } }

export class Mixvel_OrderReshopRQ implements INDCMessage {
    get xmlns() {
        return {"xmlns:Reshop": "https://www.mixvel.com/API/XSD/Mixvel_OrderReshopRQ/1_00"}
    }

    get nodeName() {
        return "Reshop:Mixvel_OrderReshopRQ"
    }

    public MixOrder: Record<string, unknown>
    public UpdateOrder?: UpdateOrder

    constructor(offerId: string) {
        this.MixOrder = { MixOrderID: offerId }
    }
}