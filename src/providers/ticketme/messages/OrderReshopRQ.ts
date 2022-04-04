import {AbstractTicketMeNDCMessage} from "./AbstractTicketMeNDCMessage";

export class OrderReshopRQ extends AbstractTicketMeNDCMessage {
    public Query: {
        OrderID: { _: string } [],
        Reprice?: Record<string, string>[]
    }[]

    constructor(orderId: string) {
        super();
        this.Query = [{
            OrderID: [{_: orderId}],
            Reprice: [{"_":""}] // @todo support various types of reshop
        }]
    }

    get nodeName() {
        return "OrderReshopRQ"
    }
}