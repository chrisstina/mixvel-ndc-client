import {IMessageMapper} from "../../../interfaces/IMessageMapper";
import {isPriceParams} from "../../../core/request/typeguards";
import {PriceParams} from "../../../core/request/parameters/Price";
import {OrderRetrieveParams} from "../../../core/request/parameters/OrderRetrieve";
import {Mixvel_ServiceListRQ, OfferRequest, OrderRequest,} from "../messages/Mixvel_ServiceListRQ";

export class ServiceListMessageMapper implements IMessageMapper {
  constructor(public readonly params: PriceParams | OrderRetrieveParams) {}

  map(): Mixvel_ServiceListRQ {
    if (isPriceParams(this.params)) {
      return new Mixvel_ServiceListRQ(
        this.createOfferRequest(this.params as PriceParams)
      );
    } else {
      return new Mixvel_ServiceListRQ(this.createOrderRequest(this.params));
    }
  }

  createOfferRequest(params: PriceParams): OfferRequest {
    const plainPriceParams = params.asPlain();
    return {
      OfferRequest: {
        Offer: {
          OfferID: plainPriceParams.offerId,
          OfferItem: plainPriceParams.offerItemIds.map((offerItemId) => {
            return {
              OfferItemID: offerItemId,
            };
          }),
        },
      },
    };
  }

  createOrderRequest(params: OrderRetrieveParams): OrderRequest {
    return {
      OrderRequest: {
        MixOrder: {
          MixOrderID: params.orderId,
        },
      },
    };
  }
}
