import {GenericNDCMessage} from "./GenericNDCMessage";

export class OtherPaymentMethod {
    public readonly OtherPaymentMethod = null
}

export class DirectBill {
    constructor(billInfo: string) {
        return {
            'DirectBill': {
                'BillInfo': billInfo
            }
        }
    }
}

export class Mixvel_OrderChangeRQ implements GenericNDCMessage {
    get endpoint() {
        return 'api/Order/change'
    }

    get xmlns() {
        return {"xmlns:o": "https://www.mixvel.com/API/XSD/Mixvel_OrderChangeRQ/1_00"}
    }

    get nodeName() {
        return "o:Mixvel_OrderChangeRQ"
    }

    public MixOrder: {
        MixOrderID: string
    }

    /**
     * for ticket issue request
     */
    public PaymentFunctions?: {
        "PaymentProcessingDetails": {
            "Amount": { "_": string, "$": { "CurCode": string } },
            "PaymentProcessingDetailsPaymentMethod": OtherPaymentMethod | DirectBill
        }
    }

    /**
     * for order refund request
     */
    public ChangeOrder?: {}

    constructor(orderId: string) {
        this.MixOrder = {MixOrderID: orderId}
    }

    setPaymentDetails({amount, currency}: { amount: string, currency: string }, fop: OtherPaymentMethod | DirectBill) {
        this.PaymentFunctions = {
            "PaymentProcessingDetails": {
                "Amount": {"_": amount, "$": {"CurCode": currency}},
                "PaymentProcessingDetailsPaymentMethod": fop
            }
        }
    }

    setItemsToDelete(orderItems: string[][]) {
        this.ChangeOrder = {
            UpdateOrderItem: {
                DeleteOrderItemList: orderItems.map(([orderId, orderItemId]) => {
                    return {
                        DeleteOrderItem: {
                            OrderID: orderId,
                            OrderItemID: orderItemId
                        }
                    }
                })
            }
        }
    }
}