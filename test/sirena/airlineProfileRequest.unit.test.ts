import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";
import { AirlineProfileParams } from "../../src/core/request/parameters/AirlineProfile";

const { setProviderConfig, getAirlineProfileRequest } =
  createNDCService("sirena");

@suite
class AirlineProfileRequestUnitTest {
  @test "Create Sirena airline profile RQ"() {
    setProviderConfig({
      party: {
        agencyId: "YOUR_KASSA",
      },
    });

    const params: AirlineProfileParams = {
      airlineCode: "SU",
    };

    const rq = getAirlineProfileRequest(params).getValue().body;
    expect(rq).to.contain("SU");
  }
}
