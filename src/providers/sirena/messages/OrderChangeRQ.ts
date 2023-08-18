import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { SirenaPTC } from "../mappers/dictionary/ptc";

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
    this.Other[0].Remarks[0].Remark.push({ _: data });
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

type Individual = {
  GivenName: StringValue[];
  Surname: StringValue[];
  MiddleName?: StringValue[];
  Birthdate: StringValue[];
};

export class OrderPax {
  public $: { PassengerID: string };
  public PTC: StringValue[] = [];
  public Individual: Individual[];
  public InfantRef?: StringValue[] = [];

  constructor(
    id: string,
    ptc: SirenaPTC,
    individual: Individual,
    infantRef?: string
  ) {
    this.$ = { PassengerID: id };
    this.PTC.push({ _: ptc });
    this.Individual = [individual];
    if (infantRef) {
      this.InfantRef = [{ _: infantRef }];
    }
  }
}

export class OrderChangeOffer {
  public readonly $: { ResponseID: string; Owner: string; OfferID: string };
  public readonly OfferItem: OrderChangeOfferItem[] = [];

  constructor(responseId: string, owner: string, offerId: string) {
    this.$ = { ResponseID: responseId, Owner: owner, OfferID: offerId };
    this.OfferItem = [];
  }
}

export class OrderChangeOfferItem {
  public readonly $: { OfferItemID: string };
  public readonly PassengerRefs: StringValue[] = [];
  public readonly ALaCarteSelection: {
    SegmentID: StringValue[];
    Quantity: StringValue[];
  }[] = [];

  constructor(
    offerItemId: string,
    passengerRefs: string,
    segmentRefs: string,
    quantity = 1
  ) {
    this.$ = { OfferItemID: offerItemId };
    this.PassengerRefs = [{ _: passengerRefs }];
    this.ALaCarteSelection = [
      {
        SegmentID: [{ _: segmentRefs }],
        Quantity: [{ _: quantity.toString() }],
      },
    ];
  }
}

export class OrderChangeRQ extends AbstractSirenaNDCMessage {
  public Query: {
    OrderID: {
      $: { Owner: string };
      _: string;
    }[];
    Payments?: {
      Payment: Payment[];
    }[];
    OrderServicing?: {
      AcceptOffer?: { Offer: OrderChangeOffer[] }[];
    }[];
  }[];
  public DataLists: {
    PassengerList: { Passenger: OrderPax[] }[];
    ContactList: {}[];
  }[];
  constructor(orderId: string, offerOwner: string) {
    super();
    this.Query = [
      {
        OrderID: [{ $: { Owner: offerOwner }, _: orderId }],
      },
    ];
    this.DataLists = [
      {
        PassengerList: [],
        ContactList: [],
      },
    ];
  }

  get nodeName() {
    return "OrderChangeRQ";
  }
}
