import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";
import { readFile } from "fs/promises";

const { getResponse } = createNDCService("ticketme");

@suite
class PriceResponseUnitTest {
  @test async "Parse price RS"() {
    const xml = await readFile("./test/ticketme-responses/price/sample.xml");
    const rs = await getResponse(xml.toString());
    expect(rs.isSuccess).to.be.true;
  }
}
