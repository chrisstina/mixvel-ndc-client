import {AbstractTicketMeNDCMessage} from "./AbstractTicketMeNDCMessage";

export class OrderCancelRQ extends AbstractTicketMeNDCMessage {
    public Query: {
        OrderID: {
            $: { Owner: string },
            _: string
        }
    }[]

    constructor(orderId: string, offerOwner: string) {
        super()
        this.Query = [{OrderID: {$: {Owner: offerOwner}, _: orderId}}]
    }

    get nodeName(): string {
        return 'OrderCancelRQ'
    }
}