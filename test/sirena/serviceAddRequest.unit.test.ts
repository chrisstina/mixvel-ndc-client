import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { setProviderConfig, getServiceAddRequest } = createNDCService("sirena");

@suite
class ServiceAddRequestUnitTest {
  @test "Create Sirena service add bag RQ for 1ADT RT"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const request = getServiceAddRequest({
      orderId: "Order-03MD90",
      orderOwner: "N4",
      offers: [
        {
          responseId: "e59ddb48f98a4c9f947bb24f1bd77e1e",
          offerId: "ALaCarteOffer_N4",
          offerOwner: "N4",
          offerItems: [
            {
              offerItemId: "ALaCarteOI-61",
              paxRefs: ["pax1", "pax2"],
              segmentRefs: ["Sg16"],
            },
          ],
        },
      ],
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
          infantRef: "pax2",
        },
        {
          id: "pax2",
          ptc: "INFANT",
          personalInfo: {
            firstName: "Testtwo",
            middleName: "Testtwo",
            lastName: "Testtwo",
            gender: "M",
            dob: new Date("2022-02-15"),
          },
        },
      ],
    });

    const rq = request.getValue().body;

    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("OrderChangeRQ");
    expect(rq).to.contain('<OrderID Owner="N4">Order-03MD90</OrderID>');
  }
}
