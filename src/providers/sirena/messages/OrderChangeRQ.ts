import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";

export class CardPaymentMethod {
  public readonly PaymentCard = [{}];
}

export class CashPaymentMethod {
  public readonly Cash = [{ $: { CashInd: true } }];
}

export class InvoicePaymentMethod {
  public readonly Other: { Remarks: { Remark: StringValue[] }[] }[] = [
    { Remarks: [{ Remark: [] }] },
  ];

  constructor(data: string) {
    this.Other[0].Remarks[0].Remark.push({_: data});
  }
}

export type PaymentMethod =
  | CardPaymentMethod
  | CashPaymentMethod
  | InvoicePaymentMethod;

type Payment = {
  Type: StringValue[];
  Method: PaymentMethod[];
  Amount: {
    $: { Code: string };
    _: string;
  }[];
};

export class OrderChangeRQ extends AbstractSirenaNDCMessage {
  public Query: {
    OrderID: {
      $: { Owner: string };
      _: string;
    }[];
    Payments: {
      Payment: Payment[];
    }[];
    DataLists: {
      PassengerList: {}[];
      ContactList: {}[];
    }[];
  }[];

  constructor(orderId: string, offerOwner: string) {
    super();
    this.Query = [
      {
        OrderID: [{ $: { Owner: offerOwner }, _: orderId }],
        Payments: [],
        DataLists: [
          {
            PassengerList: [],
            ContactList: [],
          },
        ],
      },
    ];
  }

  get nodeName() {
    return "OrderChangeRQ";
  }
}
