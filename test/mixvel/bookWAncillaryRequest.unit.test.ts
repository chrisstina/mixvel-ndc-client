import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";
import { BookProps } from "../../src/core/request/parameters/Book";

const { getBookRequest } = createNDCService("mixvel");

@suite
class BookWAncillaryRequestUnitTest {
  @test "Create Mixvel book w ancillary RQ for 1ADT RT"() {
    const params: BookProps = {
      offer: {
        offerId: "SOME-OFFER",
        offerItems: [{ offerItemId: "OFFER-1", ptc: "ADULT" }],
      },
      passengers: [
        {
          ptc: "ADULT",
          personalInfo: {
            firstName: "Test",
            middleName: "Test",
            lastName: "Test",
            gender: "M",
            dob: new Date("1999-02-15"),
          },
          identityDocument: {
            type: "REGULAR_PASSPORT_RU",
            dateOfIssue: new Date("2015-02-15"),
            dateOfExpiry: new Date("2025-02-15"),
            issuingCountry: "RU",
            number: "12345",
          },
          contacts: {
            email: "test@test.test",
            phoneNumber: "89112311441",
          },
          ancillaries: [
            {
              offerId: "BAG-OFFER",
              offerItems: [{ offerItemId: "SOME-BAG-OFFER-1" }],
            },
            {
              offerId: "SEAT-OFFER",
              offerItems: [{ offerItemId: "SOME-SEAT-OFFER-1" }],
            },
          ],
        },
      ],
    };

    const rq = getBookRequest(params).getValue().body;
    console.log(rq.toString());

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Mixvel_OrderCreateRQ");
    expect(rq).to.contain("<OfferRefID>SOME-OFFER</OfferRefID>");
    expect(rq).to.contain("<OfferItemRefID>OFFER-1");
    expect(rq).to.contain(
      "<PaxID>Pax_1</PaxID>\n                <PTC>ADT</PTC>"
    );
    expect(rq).to.contain("<OfferRefID>BAG-OFFER</OfferRefID>");
    expect(rq).to.contain(
      "                <OfferItemRefID>SOME-BAG-OFFER-1</OfferItemRefID>\n"
    );
    expect(rq).to.contain("<ContactInfoID>PaxContact_1");
    expect(rq).to.contain("<ContactInfoRefID>PaxContact_1");
    expect(rq).to.contain(
      "<MiddleName>Test</MiddleName>\n                  <Surname>Test</Surname>"
    );
  }

  @test "Create Mixvel book RQ for 2ADT"() {
    const params: BookProps = {
      offer: {
        offerId: "SOME-OFFER",
        offerItems: [{ offerItemId: "OFFER-1", ptc: "ADULT" }],
      },
      passengers: [
        {
          ptc: "ADULT",
          personalInfo: {
            firstName: "Test",
            lastName: "Test",
            gender: "M",
            dob: new Date("1999-02-15"),
          },
          identityDocument: {
            type: "REGULAR_PASSPORT_RU",
            dateOfIssue: new Date("2015-02-15"),
            dateOfExpiry: new Date("2025-02-15"),
            issuingCountry: "RU",
            number: "12345",
          },
          contacts: {
            email: "test@test.test",
            phoneNumber: "89112311441",
          },
        },
        {
          ptc: "ADULT",
          personalInfo: {
            firstName: "Other",
            lastName: "Test",
            gender: "M",
            dob: new Date("1998-02-15"),
          },
          identityDocument: {
            type: "REGULAR_PASSPORT_RU",
            dateOfIssue: new Date("2015-02-15"),
            dateOfExpiry: new Date("2025-02-15"),
            issuingCountry: "RU",
            number: "12345",
          },
          contacts: {
            email: "test@test.test",
            phoneNumber: "89112311441",
          },
          ancillaries: [
            {
              offerId: "BAG-OFFER",
              offerItems: [{ offerItemId: "SOME-BAG-OFFER-1" }],
            },
          ],
        },
      ],
    };

    const rq = getBookRequest(params).getValue().body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Mixvel_OrderCreateRQ");
    expect(rq).to.contain("<OfferRefID>SOME-OFFER</OfferRefID>");
    expect(rq).to.contain("<OfferItemRefID>OFFER-1");
    expect(rq).to.contain(
      "<PaxID>Pax_1</PaxID>\n                <PTC>ADT</PTC>"
    );
    expect(rq).to.contain("<OfferRefID>BAG-OFFER</OfferRefID>");
    expect(rq).to.contain(
      "<OfferItemRefID>SOME-BAG-OFFER-1</OfferItemRefID>\n" +
        "                <PaxRefID>Pax_2</PaxRefID>"
    );
  }
}
