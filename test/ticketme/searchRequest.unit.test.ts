import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";

import { createNDCService } from "../../src";

const { setProviderConfig, getSearchRequest } = createNDCService("ticketme");

let dateOut = new Date(),
  dateReturn = new Date();
dateOut.setDate(dateOut.getDate() + 50);
dateReturn.setDate(dateReturn.getDate() + 40);

@suite
class SearchRequestUnitTest {
  @test "Create TicketMe for 1ADT and 1CHD LED - MOW - LED search request"() {
    setProviderConfig({ party: { agencyId: "YOUR_KASSA" } });

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
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
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
    expect(rq).to.contain('<Passenger PassengerID="PAX1">');
    expect(rq).to.contain('<Passenger PassengerID="PAX2">');
    expect(rq).to.contain("ADT");
    expect(rq).to.contain("CHD");
    expect(rq).to.contain("<CabinType>\n\t\t\t\t<Code>3");
  }

  @test
  "Create TicketMe search RQ for 1ADT and 1CHD LED - MOW - LED with SU and U6 preferred, only direct flights"() {
    const rq = getSearchRequest({
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
      preferredCarriers: ["SU", "U6"],
      onlyDirect: true,
    }).getValue().body;

    expect(rq).to.not.contain("undefined");

    expect(rq).to.contain("<AirShoppingRQ");
    expect(rq).to.contain('Version="17.2"');
    expect(rq).to.contain("<AgencyID>YOUR_KASSA</AgencyID>");
    expect(rq).to.contain(
      "<Departure>\n" + "\t\t\t\t\t<AirportCode>LED</AirportCode>"
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

    expect(rq).to.contain('<Passenger PassengerID="PAX1">');
    expect(rq).to.contain('<Passenger PassengerID="PAX2">');
    expect(rq).to.contain("ADT");
    expect(rq).to.contain("CHD");

    expect(rq).to.contain(
      '<AirlinePreferences>\n\t\t\t<Airline PreferencesLevel="Preferred">\n\t\t\t\t<AirlineID>SU'
    );
    expect(rq).to.contain(
      'Airline PreferencesLevel="Preferred">\n\t\t\t\t<AirlineID>U6'
    );

    expect(rq).to.contain("<DirectPreferences>Preferred</DirectPreferences>");
  }
}
