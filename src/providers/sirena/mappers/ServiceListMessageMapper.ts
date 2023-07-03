import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { isPriceParams } from "../../../core/request/typeguards";
import { PriceParams } from "../../../core/request/parameters/Price";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { Passenger } from "../../ticketme/messages/OfferPriceRQ";
import {
  OfferRequest,
  OrderRequest,
  ServiceListRQ,
} from "../messages/ServiceListRQ";
import { PartyCredentials } from "../SirenaRequest";

export class ServiceListMessageMapper implements IMessageMapper {
  constructor(
    public readonly params: PriceParams | OrderRetrieveParams,
    public readonly credentials: PartyCredentials
  ) {}

  map(): ServiceListRQ {
    let query, dataLists, shoppingResponseId;
    if (isPriceParams(this.params)) {
      query = this.createOfferRequest(this.params as PriceParams);
      dataLists = this.createPaxDataList(this.params);
      shoppingResponseId = this.params.offers[0].responseId;
    } else {
      query = this.createOrderRequest(this.params as OrderRetrieveParams);
    }
    const message = new ServiceListRQ(query, dataLists, shoppingResponseId);
    message.addParty(this.credentials);
    return message;
  }

  createOfferRequest(params: PriceParams): OfferRequest {
    return {
      Offers: [
        {
          Offer: params.offers.map((offer) => {
            return {
              OfferID: [
                {
                  $: { Owner: offer.offerOwner || "" },
                  _: offer.offerId,
                },
              ],
              OfferItemIDs: [
                {
                  OfferItemID: offer.offerItems.map((item) => {
                    return {
                      $: { Owner: offer.offerOwner || "" },
                      _: item.offerItemId,
                    };
                  }),
                },
              ],
            };
          }),
        },
      ],
    };
  }

  createPaxDataList(params: PriceParams) {
    const paxs: Passenger[] = [];
    params.offers.forEach((offer) => {
      offer.offerItems.forEach((item) => {
        if (item.paxs !== undefined) {
          paxs.push(
            ...item.paxs.split(" ").map((paxId) => {
              return {
                $: { PassengerID: paxId },
                PTC: [
                  {
                    _: item.opts.innerPTC || "ADT",
                  },
                ],
              };
            })
          );
        }
      });
    });
    return { PassengerList: { Passenger: paxs } };
  }

  createOrderRequest(params: OrderRetrieveParams): OrderRequest {
    return {
      OrderID: {
        $: { Owner: params.offerOwner || "" },
        _: params.orderId,
      },
    };
  }
}
