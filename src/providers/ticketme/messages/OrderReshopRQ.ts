import {AbstractTicketMeNDCMessage} from "./AbstractTicketMeNDCMessage";

export class OrderReshopRQ extends AbstractTicketMeNDCMessage {
    public Query: {
        OrderID: { _: string } [],
        Reprice?: []
    }[]

    constructor(orderId: string) {
        super();
        this.Query = [{
            OrderID: [{_: orderId}],
            Reprice: [] // @todo support various types of reshop
        }]
    }

    get nodeName() {
        return "OrderReshopRQ"
    }
}