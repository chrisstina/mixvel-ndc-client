import { IMessageMapper } from "../../../interfaces/IMessageMapper";

import { FopType } from "../../../core/request/types";
import { Offer } from "../../../core/request/parameters/Price";
import {
  ContactInfo,
  Mixvel_OrderCreateRQ,
  Pax,
} from "../messages/Mixvel_OrderCreateRQ";
import { SelectedOffer } from "../messages/Mixvel_OfferPriceRQ";
import {
  AccountableDoc,
  DirectBill,
  OtherPaymentMethod,
} from "../messages/Mixvel_CommonTypes";
import { MixvelBookParams, MixvelPassenger } from "../request/parameters/Book";
import { toMixvel as toMixvelDocument } from "./dictionary/documentType";
import { toMixvel as toMixvelPTC } from "./dictionary/ptc";
import { toAge, toFOP, toMixvelDate } from "./commonMappers";
import { SSRRemark } from "../../../core/request/parameters/Book";

const DEFAULT_FOP: FopType = "CASH";

export class BookMessageMapper implements IMessageMapper {
  message: Mixvel_OrderCreateRQ;

  constructor(public readonly params: MixvelBookParams) {
    this.message = new Mixvel_OrderCreateRQ();
  }

  map(): Mixvel_OrderCreateRQ {
    const paxRefs = new Map(),
      ancillaryOffers: Array<{ ancillary: Offer; paxRef: string }> = [],
      paxRemarks = new Map();
    this.params.passengers.forEach((passenger, idx) => {
      const pax = this.passengerToPax(passenger, idx + 1);
      paxRefs.set(passenger.ptc, [
        ...(paxRefs.get(passenger.ptc) || []),
        pax.PaxID,
      ]);
      if (passenger.ssrRemarks) {
        paxRemarks.set(pax.PaxID, passenger.ssrRemarks);
      }
      this.addPax(pax, this.passengerToContact(passenger, idx + 1));
      // @todo LoyaltyProgramAccount
      if (passenger.ancillaries && passenger.ancillaries.length > 0) {
        // collect ancillaries
        ancillaryOffers.push(
          ...passenger.ancillaries.map((ancillary) => {
            return { ancillary, paxRef: pax.PaxID };
          })
        );
      }
    });

    if (paxRemarks.size > 0) {
      this.addPaxRemarks(paxRemarks);
    }

    const flightOffer = this.addSelectedOffer(this.params.offer);
    this.params.offer.offerItems.forEach(({ offerItemId, ptc }) => {
      if (paxRefs.has(ptc)) {
        this.addSelectedOfferItem(flightOffer, offerItemId, paxRefs.get(ptc));
      }
    });

    // ancillaries
    ancillaryOffers.forEach(({ ancillary, paxRef }) => {
      const ancillaryOffer = this.addSelectedOffer(ancillary);
      ancillary.offerItems.forEach(({ offerItemId }) => {
        this.addSelectedOfferItem(ancillaryOffer, offerItemId, [paxRef]);
      });
    });

    // form of payment
    this.setPaymentDetails(
      toFOP(this.params.formOfPayment || { type: DEFAULT_FOP })
    );

    return this.message;
  }

  private passengerToPax(passenger: MixvelPassenger, paxId: number): Pax {
    const pax = new Pax(
      toAge(passenger.personalInfo.dob),
      "",
      {
        ExpiryDate: toMixvelDate(passenger.identityDocument.dateOfExpiry),
        IdentityDocID: passenger.identityDocument.number,
        IdentityDocTypeCode: toMixvelDocument(passenger.identityDocument.type),
        IssueDate: toMixvelDate(passenger.identityDocument.dateOfIssue),
        IssuingCountryCode: passenger.identityDocument.issuingCountry,
        Surname: passenger.personalInfo.lastName,
      },
      {
        Birthdate: toMixvelDate(passenger.personalInfo.dob),
        GenderCode: passenger.personalInfo.gender,
        GivenName: passenger.personalInfo.firstName,
        MiddleName: passenger.personalInfo.middleName || undefined,
        Surname: passenger.personalInfo.lastName,
      },
      generatePaxReference(paxId),
      toMixvelPTC(passenger.ptc)
    );
    if (!pax.Individual.MiddleName) {
      // mind the nodes order
      delete pax.Individual.MiddleName;
    }
    if (passenger.osiRemarks && passenger.osiRemarks.length > 0) {
      pax.Remark = [];
      passenger.osiRemarks.forEach((remarkText) => {
        pax.Remark?.push({ RemarkText: remarkText });
      });
    } else {
      delete pax.Remark;
    }
    if (passenger.subsidyData) {
      pax.SubsidyInformation = {
        SubsidyProgram: passenger.subsidyData.program,
        SubsidyType: passenger.subsidyData.type,
      };
    } else {
      delete pax.SubsidyInformation;
    }
    if (passenger.loyaltyInfo) {
      pax.LoyaltyProgramAccount = {
        AccountNumber: passenger.loyaltyInfo.code || "",
        LoyaltyProgram: {
          Carrier: {
            AirlineDesigCode: passenger.loyaltyInfo.carrier || "",
          },
        },
        PaxSegmentRefID: passenger.loyaltyInfo.opts?.paxRefs || [],
      };
    } else {
      delete pax.LoyaltyProgramAccount;
    }
    return pax;
  }

  private passengerToContact(
    passenger: MixvelPassenger,
    paxId: number
  ): ContactInfo {
    return new ContactInfo(
      generateContactReference(paxId),
      {
        ContactTypeText: "personal",
        EmailAddressText: passenger.contacts.email,
      },
      {
        ContactTypeText: "personal",
        PhoneNumber: prepPhoneNumber(passenger.contacts.phoneNumber || ""),
      }
    );
  }

  private addPax(pax: Pax, paxContact: ContactInfo) {
    pax.ContactInfoRefID = paxContact.ContactInfoID;
    this.message.DataLists.PaxList.Pax.push(pax);
    this.message.DataLists.ContactInfoList.ContactInfo.push(paxContact);
  }

  /**
   * @param {Offer} offer
   * @return {SelectedOffer}
   */
  private addSelectedOffer(offer: Offer) {
    this.message.CreateOrder.SelectedOffer.push({
      OfferRefID: offer.offerId,
      SelectedOfferItem: [],
    });
    return this.message.CreateOrder.SelectedOffer[
      this.message.CreateOrder.SelectedOffer.length - 1
    ];
  }

  /**
   * @param {SelectedOffer} selectedOffer
   * @param {string} offerItemId
   * @param {string[]} paxRefs
   */
  private addSelectedOfferItem(
    selectedOffer: SelectedOffer,
    offerItemId: string,
    paxRefs: Array<string>
  ) {
    if (!selectedOffer.SelectedOfferItem) {
      selectedOffer.SelectedOfferItem = [];
    }
    selectedOffer.SelectedOfferItem.push({
      OfferItemRefID: offerItemId,
      PaxRefID: paxRefs,
    });
  }

  private addPaxRemarks(paxRemarks: Map<string, Array<SSRRemark>>) {
    this.message.DataLists.PaxSegmentRemarkList = { PaxSegmentRemark: [] };
    paxRemarks.forEach((ssrRemarks, paxRef) => {
      ssrRemarks.forEach((remark) => {
        const paxremark = {
          PaxRefID: paxRef,
          Type: remark.type,
          Text: remark.text,
        };
        this.message.DataLists.PaxSegmentRemarkList?.PaxSegmentRemark.push(
          paxremark
        );
      });
    });
  }

  private setPaymentDetails(
    fop: OtherPaymentMethod | DirectBill | AccountableDoc
  ) {
    this.message.PaymentFunctions = {
      PaymentProcessingDetails: {
        PaymentProcessingDetailsPaymentMethod: fop,
      },
    };
  }
}

function generatePaxReference(paxId: number): string {
  return `Pax_${paxId}`;
}

function generateContactReference(paxId: number): string {
  return `PaxContact_${paxId}`;
}

/**
 * Phone has to contain '+' sign
 * @param phone
 */
function prepPhoneNumber(phone: string) {
  return [phone.indexOf("+") !== -1 ? "" : "+", phone].join("");
}
