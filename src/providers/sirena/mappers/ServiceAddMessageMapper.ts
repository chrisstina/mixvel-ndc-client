import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import {
  OrderChangeParams,
  OrderPassenger,
} from "../../../core/request/parameters/OrderChange";
import {
  OrderChangeOffer,
  OrderChangeOfferItem,
  OrderChangeRQ,
  OrderPax,
} from "../messages/OrderChangeRQ";
import { PartyCredentials } from "../SirenaRequest";
import { Individual } from "../messages/OrderCreateRQ";
import {
  toTicketMeDate,
  toTicketMeGender,
} from "../../ticketme/mappers/commonMappers";
import { toSirena as toSirenaPTC } from "./dictionary/ptc";

export class ServiceAddMessageMapper implements IMessageMapper {
  constructor(
    public readonly params: OrderChangeParams,
    public readonly credentials: PartyCredentials
  ) {}

  map(): OrderChangeRQ {
    const message = new OrderChangeRQ(
      this.params.orderId,
      this.params.orderOwner
    );
    message.Query[0].OrderServicing = [
      {
        AcceptOffer: [
          {
            Offer: this.params.offers.map((offer) => {
              const changeOffer = new OrderChangeOffer(
                offer.responseId || "",
                offer.offerOwner || "",
                offer.offerId
              );
              changeOffer.OfferItem.push(
                ...offer.offerItems.map(
                  (item) =>
                    new OrderChangeOfferItem(
                      item.offerItemId,
                      item.paxRefs.join(" "),
                      item.segmentRefs.join(" "),
                      item.quantity
                    )
                )
              );
              return changeOffer;
            }),
          },
        ],
      },
    ];

    if (this.params.passengers) {
      message.DataLists[0].PassengerList = [
        {
          Passenger: this.params.passengers.map((passenger) =>
            this.passengerToPax(passenger)
          ),
        },
      ];
    }

    message.addParty(this.credentials);
    return message;
  }

  private passengerToPax(passenger: OrderPassenger) {
    const individual: Individual = {
      GivenName: [{ _: passenger.personalInfo.firstName }],
      Surname: [{ _: passenger.personalInfo.lastName }],
      Birthdate: [{ _: toTicketMeDate(passenger.personalInfo.dob) }],
      Gender: [{ _: toTicketMeGender(passenger.personalInfo.gender) }],
    };
    if (passenger.personalInfo.middleName) {
      individual["MiddleName"] = [
        { _: passenger.personalInfo.middleName || "" },
      ];
    }
    return new OrderPax(
      passenger.id || "",
      toSirenaPTC(passenger.ptc),
      individual,
      passenger.infantRef
    );
  }
}
