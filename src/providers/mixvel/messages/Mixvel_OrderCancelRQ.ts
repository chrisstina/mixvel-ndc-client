import { INDCMessage } from "../../../interfaces/INDCMessage";

export class Mixvel_OrderCancelRQ implements INDCMessage {
  public MixOrder: { MixOrderID: string };

  constructor(orderId: string) {
    this.MixOrder = { MixOrderID: orderId };
  }

  get xmlns() {
    return {
      "xmlns:m": "https://www.mixvel.com/API/XSD/Mixvel_OrderCancelRQ/1_01",
    };
  }

  get nodeName() {
    return "m:Mixvel_OrderCancelRQ";
  }
}
