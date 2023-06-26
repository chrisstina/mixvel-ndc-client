import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { isPriceParams } from "../../../core/request/typeguards";
import { PriceParams } from "../../../core/request/parameters/Price";
import { MethodNotImplemented } from "../../../core/errors/MethodNotImplemented";
import { Passenger } from "../../ticketme/messages/OfferPriceRQ";
import { ServiceListRQ } from "../messages/ServiceListRQ";
import { PartyCredentials } from "../SirenaRequest";

export class ServiceListMessageMapper implements IMessageMapper {
  message: ServiceListRQ;

  constructor(
    public readonly params: PriceParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new ServiceListRQ();
    this.message.addParty(credentials);
  }

  map(): ServiceListRQ {
    if (isPriceParams(this.params)) {
      return this.createOfferRequest(this.params as PriceParams);
    } else {
      throw new MethodNotImplemented("");
    }
  }

  createOfferRequest(params: PriceParams): ServiceListRQ {
    const paxs: Passenger[] = [];
    this.message.Query = {
      Offer: params.offers.map((offer) => {
        return {
          $: {
            Owner: offer.offerOwner || "",
            OfferID: offer.offerId,
            ResponseID: offer.responseId || "",
          },
          OfferItem: offer.offerItems.map((item) => {
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
            return {
              $: { OfferItemID: item.offerItemId },
              PassengerRefs: { _: item.paxs || "" },
            };
          }),
        };
      }),
    };
    this.message.DataLists = { PassengerList: { Passenger: paxs } };
    return this.message;
  }
}
