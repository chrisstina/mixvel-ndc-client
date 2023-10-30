import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { getServiceListRequest } = createNDCService("mixvel");

@suite
class ServiceRequestUnitTest {
  @test "Create service list RQ for several offer items"() {
    const request = getServiceListRequest({
      offers: [
        {
          offerId: "SOME-OFFER",
          offerItems: [
            {
              offerItemId: "OFFER_ITEM_1",
              paxs: "pax1 pax2",
            },
            {
              offerItemId: "OFFER_ITEM_2",
              paxs: "pax3",
            },
          ],
        },
      ],
    }).getValue();

    expect(request.options.endpoint).to.equal("api/ServiceList");

    const rq = request.body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Service:Mixvel_ServiceListRQ");
    expect(rq).to.contain("<OfferID>SOME-OFFER");
  }

  @test "Create service list RQ for order id"() {
    const request = getServiceListRequest({ orderId: "1" }).getValue();
    expect(request.options.endpoint).to.equal("api/ServiceList");
    const rq = request.body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("Service:Mixvel_ServiceListRQ");
    expect(rq).to.contain("<MixOrderID>1</MixOrderID>");
  }
}
