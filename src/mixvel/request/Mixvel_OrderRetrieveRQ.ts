import {GenericNDCMessage} from "./GenericNDCMessage";

export class Mixvel_OrderRetrieveRQ implements GenericNDCMessage {
    get endpoint() {
        return 'api/Order/create'
    }

    get xmlns() {
        return {"xmlns:o": "https://www.mixvel.com/API/XSD/Mixvel_OrderRetrieveRQ/1_00"}
    }

    get nodeName() {
        return "m:Mixvel_OrderRetrieveRQ"
    }

    public OrderFilterCriteria: {
        "MixOrder": { "MixOrderID": string }
    }

    constructor(offerId: string) {
        this.OrderFilterCriteria = {MixOrder: {MixOrderID: offerId}}
    }
}