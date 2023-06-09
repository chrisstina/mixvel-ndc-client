import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../src";

const { getBookRequest } = createNDCService("mixvel");

@suite
class BookRequestValidationUnitTest {
  @test "Validate book request for 1ADT 1INF"() {
    let result = getBookRequest({
      offer: {
        offerId: "98be3642-40fb-4acf-aba5-f3c2308c5e22",
        offerItems: [
          {
            offerItemId: "86e64a70-5d91-4a59-ae11-ae697629c480",
            ptc: "ADULT",
          },
          {
            offerItemId: "3a25de8b-3e49-4a22-821e-6295d6b2cf2e",
            ptc: "INFANT",
          },
        ],
      },
      passengers: [
        {
          ptc: "ADULT",
          personalInfo: {
            firstName: "Dmitriy",
            middleName: "Nikolaevich",
            lastName: "Ivanov",
            gender: "M",
            dob: new Date("2000-09-01T08:00:00.000Z"),
          },
          identityDocument: {
            type: "REGULAR_PASSPORT_RU",
            dateOfIssue: new Date("2021-02-07T08:00:00.000Z"),
            dateOfExpiry: new Date("2027-02-06T08:00:00.000Z"),
            issuingCountry: "RU",
            number: "2704542188",
          },
          contacts: {
            email: "mail@test.test",
            phoneNumber: "75190498498",
          },
        },
        {
          ptc: "INFANT",
          personalInfo: {
            firstName: "Oleg",
            middleName: "Nikolaevich",
            lastName: "Ivanov",
            gender: "M",
            dob: new Date("2020-09-01T08:00:00.000Z"),
          },
          identityDocument: {
            type: "BIRTHDAY_CERTIFICATE",
            dateOfIssue: new Date("2021-02-07T08:00:00.000Z"),
            dateOfExpiry: new Date("2027-02-06T08:00:00.000Z"),
            issuingCountry: "RU",
            number: "IVVVВВ123141",
          },
          contacts: { phoneNumber: "75190498498" },
        },
      ],
    });

    console.log(result.error);

    expect(result.isSuccess).to.be.true;
  }
}
