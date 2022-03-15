import {AbstractTicketMeNDCMessage, StringValue} from "./AbstractTicketMeNDCMessage";

export class CardPaymentMethod {
    public readonly PaymentCard = [{}]
}

export class CashPaymentMethod {
    public readonly Cash = [{}]
}

export class OtherPaymentMethod {
    public readonly Other = [{}]
}

export type PaymentMethod = CardPaymentMethod | CashPaymentMethod | OtherPaymentMethod

type Payment = {
    "Type": StringValue[],
    "Method": PaymentMethod[],
    "Amount":
        {
            "$": { "Code": string },
            "_": string
        }[],
    "Order":
        {
            "$": {
                "OrderID": string,
                "Owner": string
            }
        }[]
}

export class AirDocIssueRQ extends AbstractTicketMeNDCMessage {
    public Query: {
        TicketDocQuantity: StringValue[],
        TicketDocInfo: {
            PassengerReference: StringValue[],
            Payments?: {
                "Payment": Payment[]
            }[]
        }[]
        // DataLists?: {
        //     PassengerList: {
        //         Passenger: Pax[]
        //     }[]
        // }[],
    }[]

    constructor(paxs: string[]) {
        super();
        this.Query = [{
            TicketDocQuantity: [{_: paxs.length.toString()}],
            TicketDocInfo: paxs.map(paxRef => {
                return {
                    PassengerReference: [{_: paxRef}],
                }
            })
        }]
    }

    get nodeName() {
        return "AirDocIssueRQ"
    }
}