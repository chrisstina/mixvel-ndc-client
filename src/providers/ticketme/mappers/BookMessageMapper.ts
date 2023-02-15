import {IMessageMapper} from "../../../interfaces/IMessageMapper";

import {BookParams, Passenger} from "../../../core/request/parameters/Book";
import {PartyCredentials} from "../TicketMeRequest";
import {IdentityDocument, Individual, OrderCreateRQ, Pax, PaxContact,} from "../messages/OrderCreateRQ";
import {toTicketMe as toTicketMePTC} from "./dictionary/ptc";
import {toTicketMe as toTicketMeDocument} from "./dictionary/documentType";
import {genderToTitle, toTicketMeDate, toTicketMeGender,} from "./commonMappers";

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
    this.message.addParty(this.credentials);
  }

  map(): OrderCreateRQ {
    this.params.passengers.forEach((passenger) => {
      const paxContact = this.passengerToContact(passenger);
      this.addPax(this.passengerToPax(passenger, paxContact), paxContact);
    });
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
        { _: toTicketMeDocument(passenger.identityDocument.type) },
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

    const pax: Pax = {
      $: { PassengerID: passenger.id || "" },
      PTC: [{ _: toTicketMePTC(passenger.ptc) }],
      CitizenshipCountryCode: [
        { _: passenger.identityDocument.issuingCountry },
      ],
      Individual: [individual],
      IdentityDocument: [document],
      ContactInfoRef: [{ _: paxContact.$.ContactID }],
    };
    return pax;
  }

  private passengerToContact(passenger: Passenger) {
    const contact: PaxContact = {
      $: { ContactID: generateContactReference(passenger.id || "") },
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
