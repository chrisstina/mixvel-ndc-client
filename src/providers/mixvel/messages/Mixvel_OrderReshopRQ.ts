import { INDCMessage } from "../../../interfaces/INDCMessage";

type UpdateOrder = { CancelOrder: { OrderRefID: Iterable<string> } };

export class Mixvel_OrderReshopRQ implements INDCMessage {
  public MixOrder: Record<string, unknown>;
  public UpdateOrder?: UpdateOrder;

  constructor(offerId: string) {
    this.MixOrder = { MixOrderID: offerId };
  }

  get xmlns() {
    return {
      "xmlns:Reshop":
        "https://www.mixvel.com/API/XSD/Mixvel_OrderReshopRQ/1_00",
    };
  }

  get nodeName() {
    return "Reshop:Mixvel_OrderReshopRQ";
  }
}
