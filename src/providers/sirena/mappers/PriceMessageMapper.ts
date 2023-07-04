import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { PriceParams } from "../../../core/request/parameters/Price";
import { OfferPriceRQ, Passenger } from "../messages/OfferPriceRQ";
import { PartyCredentials } from "../SirenaRequest";

export class PriceMessageMapper implements IMessageMapper {
  message: OfferPriceRQ;

  constructor(
    public readonly params: PriceParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new OfferPriceRQ();
    this.message.addParty(credentials);
  }

  map(): OfferPriceRQ {
    const paxs: Passenger[] = [];
    this.message.Query = {
      Offer: this.params.offers.map((offer) => {
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
    if (
      this.params.offers.some((offer) => {
        return offer.offerItems.some((item) => item.opts.needUpsell);
      })
    ) {
      this.message.setUpsell();
    }
    this.message.DataLists = { PassengerList: { Passenger: paxs } };
    return this.message;
  }
}
