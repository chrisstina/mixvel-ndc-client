import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { BookParams, Passenger } from "../../../core/request/parameters/Book";
import { PartyCredentials } from "../SirenaRequest";
import {
  IdentityDocument,
  Individual,
  OrderCreateRQ,
  Pax,
  PaxContact,
} from "../messages/OrderCreateRQ";
import { SirenaPTC, toSirena as toSirenaPTC } from "./dictionary/ptc";
import { toSirena as toSirenaDocument } from "./dictionary/documentType";
import {
  genderToTitle,
  toTicketMeDate,
  toTicketMeGender,
} from "../../ticketme/mappers/commonMappers";
import { PtcHelper } from "../../../core/helpers/ptc";

export class BookMessageMapper implements IMessageMapper {
  message: OrderCreateRQ;

  constructor(
    public readonly params: BookParams,
    public readonly credentials: PartyCredentials
  ) {
    this.message = new OrderCreateRQ({
      $: {
        Owner: this.params.offer.offerOwner || "",
        OfferID: this.params.offer.offerId,
        ResponseID: this.params.offer.responseId || "",
      },
      OfferItem: this.params.offer.offerItems.map((item) => {
        return {
          $: { OfferItemID: item.offerItemId },
          PassengerRefs: { _: item.paxs || "" },
        };
      }),
    });
    this.message.addParty({
      ...this.credentials,
      contacts: this.params.agencyContacts,
    });
  }

  map(): OrderCreateRQ {
    this.params.passengers.forEach((passenger) => {
      const paxContact = this.passengerToContact(passenger);
      this.addPax(this.passengerToPax(passenger, paxContact), paxContact);
    });
    if (PtcHelper.hasInfants(this.params)) {
      this.createInfantRefs();
    }
    return this.message;
  }

  private addPax(pax: Pax, paxContact: PaxContact) {
    this.message.Query[0].DataLists[0].PassengerList[0].Passenger.push(pax);
    this.message.Query[0].DataLists[0].ContactList[0].ContactInformation.push(
      paxContact
    );
  }

  private passengerToPax(passenger: Passenger, paxContact: PaxContact) {
    const document: IdentityDocument = {
      IdentityDocumentNumber: [{ _: passenger.identityDocument.number }],
      IdentityDocumentType: [
        { _: toSirenaDocument(passenger.identityDocument.type) },
      ],
      ExpiryDate: [
        { _: toTicketMeDate(passenger.identityDocument.dateOfExpiry) },
      ],
      Birthdate: [{ _: toTicketMeDate(passenger.personalInfo.dob) }],
      NameTitle: [{ _: genderToTitle(passenger.personalInfo.gender) }],
      GivenName: [{ _: passenger.personalInfo.firstName }],
      Surname: [{ _: passenger.personalInfo.lastName }],
    };

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
    const pax = new Pax(
      passenger.id || "",
      toSirenaPTC(passenger.ptc),
      passenger.identityDocument.issuingCountry,
      individual,
      document,
      paxContact.$.ContactID
    );

    if (passenger.loyaltyInfo && passenger.loyaltyInfo.code) {
      pax.LoyaltyProgramAccount = [
        {
          Airline: {
            AirlineDesignator: [{ _: passenger.loyaltyInfo.carrier || "" }],
          },
          AccountNumber: [{ _: passenger.loyaltyInfo.code }],
        },
      ];
    }
    return pax;
  }

  private createInfantRefs() {
    const infantRefs: string[] =
      this.message.Query[0].DataLists[0].PassengerList[0].Passenger.filter(
        (passenger: Pax) => passenger.PTC[0]._ === SirenaPTC.INFANT
      ).map((passenger: Pax) => passenger.$.PassengerID);

    this.message.Query[0].DataLists[0].PassengerList[0].Passenger.forEach(
      (passenger: Pax) => {
        if (infantRefs.length > 0 && passenger.PTC[0]._ === SirenaPTC.ADULT) {
          passenger.attachInfant(infantRefs.pop());
        }
      }
    );
  }

  private passengerToContact(passenger: Passenger) {
    const contact: PaxContact = {
      $: { ContactID: generateContactReference(passenger.id || "") },
      ContactType: [{ _: "Primary" }],
      ContactProvided: [],
    };
    if (passenger.contacts.phoneNumber) {
      contact.ContactProvided.push({
        Phone: [{ PhoneNumber: [{ _: passenger.contacts.phoneNumber }] }],
      });
    }
    if (passenger.contacts.email) {
      contact.ContactProvided.push({
        EmailAddress: [
          { EmailAddressValue: [{ _: passenger.contacts.email }] },
        ],
      });
    }
    return contact;
  }
}

function generateContactReference(paxId: string): string {
  return `CTC_${paxId}`;
}
