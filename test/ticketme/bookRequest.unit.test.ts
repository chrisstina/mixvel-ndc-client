import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";

import {createNDCService} from "../../src";
import {BookProps} from "../../src/core/request/parameters/Book";

const { setProviderConfig, getBookRequest } = createNDCService("ticketme");

@suite
class BookRequestUnitTest {
  @test "Create TicketMe book RQ for 1ADT RT"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const params: BookProps = {
      offer: {
        offerId: "SOME-OFFER",
        offerItems: [{ offerItemId: "OFFER-1", paxs: "pax1" }],
        offerOwner: "KW",
        responseId: "123",
      },
      passengers: [
        {
          id: "pax1",
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
            phoneNumber: "89112311441",
            email: "test@test.test",
          },
        },
      ],
    };

    const rq = getBookRequest(params).getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderCreateRQ");
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain(
      '<Offer Owner="KW" OfferID="SOME-OFFER" ResponseID="123">'
    );
    expect(rq).to.contain('OfferItemID="OFFER-1"');
    expect(rq).to.contain("<PassengerRefs>pax1");
    expect(rq).to.contain('PassengerID="pax1">\n' + "\t\t\t\t\t<PTC>ADT</PTC>");
    expect(rq).to.contain("<PassengerRefs>pax1");
    expect(rq).to.contain(
      "<EmailAddressValue>test@test.test</EmailAddressValue>"
    );
    expect(rq).to.contain("<PhoneNumber>89112311441</PhoneNumber>");
    expect(rq).to.contain(
      "<NameTitle>Mr</NameTitle>\n" +
        "\t\t\t\t\t\t<GivenName>Test</GivenName>\n" +
        "\t\t\t\t\t\t<Surname>Test</Surname>"
    );
  }

  @test "Create Ticketme book RQ for 2ADT 1CHD 1INF RT"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const params: BookProps = {
      offer: {
        offerId: "SOME-OFFER",
        offerItems: [
          { offerItemId: "OFFER-1", paxs: "pax1 pax2" },
          { offerItemId: "OFFER-2", paxs: "pax3" },
          { offerItemId: "OFFER-3", paxs: "pax4" },
        ],
        offerOwner: "KW",
        responseId: "123",
      },
      passengers: [
        {
          id: "pax1",
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
        },
        {
          id: "pax2",
          ptc: "ADULT",
          personalInfo: {
            firstName: "TestTwo",
            middleName: "TestTwo",
            lastName: "TestTwo",
            gender: "F",
            dob: new Date("1999-03-15"),
          },
          identityDocument: {
            type: "REGULAR_PASSPORT_RU",
            dateOfIssue: new Date("2015-02-15"),
            dateOfExpiry: new Date("2025-02-15"),
            issuingCountry: "RU",
            number: "12346",
          },
          contacts: {
            email: "test@test.test",
            phoneNumber: "89112311441",
          },
        },
        {
          id: "pax3",
          ptc: "CHILD",
          personalInfo: {
            firstName: "TestChild",
            middleName: "TestTwo",
            lastName: "TestTwo",
            gender: "F",
            dob: new Date("2015-03-15"),
          },
          identityDocument: {
            type: "BIRTHDAY_CERTIFICATE",
            dateOfIssue: new Date("2015-04-15"),
            dateOfExpiry: new Date("2025-02-15"),
            issuingCountry: "RU",
            number: "12346",
          },
          contacts: {
            email: "test@test.test",
            phoneNumber: "89112311441",
          },
        },
        {
          id: "pax4",
          ptc: "INFANT",
          personalInfo: {
            firstName: "TestInfant",
            middleName: "TestTwo",
            lastName: "TestTwo",
            gender: "F",
            dob: new Date("2020-05-15"),
          },
          identityDocument: {
            type: "BIRTHDAY_CERTIFICATE",
            dateOfIssue: new Date("2020-05-15"),
            dateOfExpiry: new Date("2025-02-15"),
            issuingCountry: "RU",
            number: "12346",
          },
          contacts: {
            phoneNumber: "",
          },
        },
      ],
    };

    const rq = getBookRequest(params).getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderCreateRQ");
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain(
      '<Offer Owner="KW" OfferID="SOME-OFFER" ResponseID="123">'
    );
    expect(rq).to.contain('OfferItemID="OFFER-1"');
    expect(rq).to.contain('OfferItemID="OFFER-2"');
    expect(rq).to.contain('OfferItemID="OFFER-3"');
    expect(rq).to.contain("<PassengerRefs>pax1");
    expect(rq).to.contain('PassengerID="pax1">\n' + "\t\t\t\t\t<PTC>ADT</PTC>");
    expect(rq).to.contain(
      "<EmailAddressValue>test@test.test</EmailAddressValue>"
    );
    expect(rq).to.contain("<PhoneNumber>89112311441</PhoneNumber>");
    expect(rq).to.contain(
      "<NameTitle>Mr</NameTitle>\n" +
        "\t\t\t\t\t\t<GivenName>Test</GivenName>\n" +
        "\t\t\t\t\t\t<Surname>Test</Surname>"
    );
  }
}
