import {GenericNDCMessage} from "../../../interfaces/GenericNDCMessage";

export class Mixvel_OrderReshopRQ implements GenericNDCMessage {
    get xmlns() {
        return {"xmlns:Reshop": "https://www.mixvel.com/API/XSD/Mixvel_OrderReshopRQ/1_00"}
    }

    get nodeName() {
        return "Reshop:Mixvel_OrderReshopRQ"
    }

    public MixOrder: {}

    constructor(offerId: string) {
        this.MixOrder = {MixOrderID: offerId}
    }
}