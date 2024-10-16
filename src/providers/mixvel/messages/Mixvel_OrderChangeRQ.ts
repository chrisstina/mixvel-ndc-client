import { INDCMessage } from "../../../interfaces/INDCMessage";
import {
  AccountableDoc,
  DirectBill,
  OtherPaymentMethod,
} from "./Mixvel_CommonTypes";

export class Mixvel_OrderChangeRQ implements INDCMessage {
  constructor(orderId?: string) {
    if (orderId) {
      this.setMixOrder(orderId);
    }
  }
  /**
   * for ticket issue request
   */
  public PaymentFunctions?: {
    PaymentProcessingDetails: {
      Amount: { _: string; $: { CurCode: string } };
      PaymentProcessingDetailsPaymentMethod:
        | OtherPaymentMethod
        | DirectBill
        | AccountableDoc;
    };
  };
  /**
   * for order refund or split requests
   */
  public ChangeOrder?: Record<string, unknown>;

  public MixOrder?: {
    MixOrderID: string;
  };

  get endpoint() {
    return "api/Order/change";
  }

  get xmlns() {
    return {
      "xmlns:o": "https://www.mixvel.com/API/XSD/Mixvel_OrderChangeRQ/1_00",
    };
  }

  get nodeName() {
    return "o:Mixvel_OrderChangeRQ";
  }

  setMixOrder(orderId: string) {
    this.MixOrder = { MixOrderID: orderId };
  }
}
