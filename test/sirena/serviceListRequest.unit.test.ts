import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { setProviderConfig, getServiceListRequest } = createNDCService("sirena");

@suite
class ServiceListRequestUnitTest {
  @test "Create service list RQ"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const request = getServiceListRequest({
      offers: [
        {
          offerId: "SOME_OFFER",
          responseId: "SOME_RESONSE_ID",
          offerOwner: "N4",
          offerItems: [
            {
              offerItemId: "OFFER_ITEM_1",
              paxs: "pax1 pax2",
              ptc: "ADULT",
              opts: {
                innerPTC: "ADT",
              }
            },
            {
              offerItemId: "OFFER_ITEM_2",
              paxs: "pax3",
              ptc: "CHILD",
              opts: {
                innerPTC: "CNN",
              }
            },
          ],
        },
      ],
    });

    const rq = request.getValue().body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("ServiceListRQ");
    expect(rq).to.contain('<ResponseID>SOME_RESONSE_ID</ResponseID>');
    expect(rq).to.contain(
      '<Offer Owner="N4" OfferID="SOME_OFFER"'
    );
    expect(rq).to.contain('<OfferItem OfferItemID="OFFER_ITEM_1">');
    expect(rq).to.contain('<OfferItem OfferItemID="OFFER_ITEM_2">');
    expect(rq).to.contain('PassengerID="pax1"');
    expect(rq).to.contain('PassengerID="pax2"');
    expect(rq).to.contain('PassengerID="pax3"');
    expect(rq).to.contain('<PTC>ADT</PTC>');
    expect(rq).to.contain('<PTC>CNN</PTC>');
  }

  @test "Create service list RQ for order id"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

    const request = getServiceListRequest({ orderId: "ORDER_ID", offerOwner: "N4" }).getValue();
    const rq = request.body;
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("ServiceListRQ");
    expect(rq).to.not.contain("undefined");
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain('<OrderID Owner="N4">ORDER_ID</OrderID>');
  }
}
