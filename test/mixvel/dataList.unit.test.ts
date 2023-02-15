import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";
import { readFile } from "fs/promises";

import { createNDCService } from "../../src";

const { extractDataLists, getResponse } = createNDCService("mixvel");

@suite
class DataListUnitTest {
  @test async "Extract data lists for search response"() {
    const xml = await readFile("./test/mixvel-responses/search/1ADT.xml");
    const rs = await getResponse(xml.toString());

    expect(rs.isSuccess).to.be.true;
    expect(rs.getValue()).to.have.property("DataLists");

    const { odList } = extractDataLists(rs.getValue().DataLists);
    expect(odList).to.have.property("entityName");
    expect(odList).to.have.property("list");
    expect(odList).to.have.property("findByReference");
  }
}
