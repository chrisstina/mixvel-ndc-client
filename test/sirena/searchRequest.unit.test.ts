import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { setProviderConfig, getSearchRequest } = createNDCService("sirena");

let dateOut = new Date(),
  dateReturn = new Date();
dateOut.setDate(dateOut.getDate() + 50);
dateReturn.setDate(dateReturn.getDate() + 40);

@suite
class SearchRequestUnitTest {
  @test "Create Sirena for 1ADT and 1CHD LED - MOW - LED search request"() {
    setProviderConfig({ party: { agencyId: "05КЛД" } });

    const request = getSearchRequest({
      travelers: [
        { ptc: "ADULT", age: 30, id: "1" },
        { ptc: "CHILD", age: 5, id: "2" },
      ],
      originDestinations: [
        {
          from: "LED",
          to: "MOW",
          dateRangeEnd: dateOut,
          dateRangeStart: dateOut,
        },
        {
          from: "MOW",
          to: "LED",
          dateRangeEnd: dateReturn,
          dateRangeStart: dateReturn,
        },
      ],
      cabin: "ECONOMY",
    });
    const rq = request.getValue().body;

    expect(rq).to.not.contain("undefined");

    expect(rq).to.contain("<AirShoppingRQ");
    expect(rq).to.contain('Version="17.2"');
    expect(rq).to.contain("<AgencyID>05КЛД</AgencyID>");
    expect(rq).to.contain(
      "<Departure>\n" +
        "\t\t\t\t\t<AirportCode>LED</AirportCode>\n" +
        "\t\t\t\t\t<Date>"
    );
    expect(rq).to.contain(
      "<Arrival>\n" +
        "\t\t\t\t\t<AirportCode>MOW</AirportCode>\n" +
        "\t\t\t\t</Arrival>"
    );
    expect(rq).to.contain(
      "<Departure>\n" +
        "\t\t\t\t\t<AirportCode>MOW</AirportCode>\n" +
        "\t\t\t\t\t<Date>"
    );
    expect(rq).to.contain(
      "<Arrival>\n" +
        "\t\t\t\t\t<AirportCode>LED</AirportCode>\n" +
        "\t\t\t\t</Arrival>"
    );
    expect(rq).to.contain('<Passenger PassengerID="T1">');
    expect(rq).to.contain('<Passenger PassengerID="T2">');
    expect(rq).to.contain("ADT");
    expect(rq).to.contain("CHD");
    expect(rq).to.contain("<CabinType>\n\t\t\t\t<Code>Y");
  }

  @test
  "Create Sirena search RQ for 1ADT 1CHD 1INF LED - MOW - LED"() {
    setProviderConfig({ party: { agencyId: "05КЛД" } });

    const request = getSearchRequest({
      travelers: [
        { ptc: "ADULT", age: 30, id: "1" },
        { ptc: "CHILD", age: 5, id: "2" },
        { ptc: "INFANT", age: 1, id: "3" },
      ],
      originDestinations: [
        {
          from: "LED",
          to: "MOW",
          dateRangeEnd: dateOut,
          dateRangeStart: dateOut,
        },
        {
          from: "MOW",
          to: "LED",
          dateRangeEnd: dateReturn,
          dateRangeStart: dateReturn,
        },
      ],
      cabin: "ECONOMY",
    });
    const rq = request.getValue().body;
    expect(rq).to.not.contain("undefined");

    expect(rq).to.contain("<AirShoppingRQ");
    expect(rq).to.contain('Version="17.2"');
    expect(rq).to.contain("<AgencyID>05КЛД</AgencyID>");
    expect(rq).to.contain(
      "<Departure>\n" +
      "\t\t\t\t\t<AirportCode>LED</AirportCode>\n" +
      "\t\t\t\t\t<Date>"
    );
    expect(rq).to.contain(
      "<Arrival>\n" +
      "\t\t\t\t\t<AirportCode>MOW</AirportCode>\n" +
      "\t\t\t\t</Arrival>"
    );
    expect(rq).to.contain(
      "<Departure>\n" +
      "\t\t\t\t\t<AirportCode>MOW</AirportCode>\n" +
      "\t\t\t\t\t<Date>"
    );
    expect(rq).to.contain(
      "<Arrival>\n" +
      "\t\t\t\t\t<AirportCode>LED</AirportCode>\n" +
      "\t\t\t\t</Arrival>"
    );
    expect(rq).to.contain('<Passenger PassengerID="T1">');
    expect(rq).to.contain('<Passenger PassengerID="T2">');
    expect(rq).to.contain('<Passenger PassengerID="T3">');
    expect(rq).to.contain('<InfantRef>T3</InfantRef>')

    expect(rq).to.contain("ADT");
    expect(rq).to.contain("CHD");
    expect(rq).to.contain("INF");
    expect(rq).to.contain("<CabinType>\n\t\t\t\t<Code>Y");
  }
}
