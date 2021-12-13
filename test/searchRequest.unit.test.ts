import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getSearchRequest} from "../src"

@suite
class SearchRequestUnitTest {
    @test 'Create search RQ for 1ADT and 1CHD LED - MOW - LED ECONOMY'() {
        const rq = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: "30", id: "1"},
                {ptc: 'CHILD', age: "5", id: "2"}
            ],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: "2021-12-12", dateRangeStart: "2021-12-12"},
                {from: "MOW", to: "LED", dateRangeEnd: "2021-12-15", dateRangeStart: "2021-12-15"}
            ],
            cabin: "ECONOMY",
            preferredCarriers: null
        }).toXML()

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('shop:Mixvel_AirShoppingRQ')
        expect(rq).to.contain("<DestArrivalCriteria>\n                  <IATA_LocationCode>LED</IATA_LocationCode>")
        expect(rq).to.contain("<OriginDepCriteria>\n                  <DateRangeStart>2021-12-12</DateRangeStart>")
        expect(rq).to.contain("<OriginDepCriteria>\n                  <DateRangeStart>2021-12-15</DateRangeStart>")
        expect(rq).to.contain("<PTC>CNN</PTC>")
        expect(rq).to.contain("<PTC>ADT</PTC>")
        expect(rq).to.contain("<CabinTypeCode>Economy</CabinTypeCode>\n" +
        "                  <PrefLevel>\n" +
        "                    <PrefLevelCode>Required</PrefLevelCode>\n" +
        "                  </PrefLevel>")
    }

    @test 'Create search RQ for 1ADT and 1CHD LED - MOW - LED ECONOMY with SU and U6 preferred'() {
        const rq = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: "30", id: "1"},
                {ptc: 'CHILD', age: "5", id: "2"}
            ],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: "2021-12-12", dateRangeStart: "2021-12-12"},
                {from: "MOW", to: "LED", dateRangeEnd: "2021-12-15", dateRangeStart: "2021-12-15"}
            ],
            cabin: "ECONOMY",
            preferredCarriers: ['SU', 'U6']
        }).toXML()

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('shop:Mixvel_AirShoppingRQ')
        expect(rq).to.contain("<DestArrivalCriteria>\n                  <IATA_LocationCode>LED</IATA_LocationCode>")
        expect(rq).to.contain("<OriginDepCriteria>\n                  <DateRangeStart>2021-12-12</DateRangeStart>")
        expect(rq).to.contain("<OriginDepCriteria>\n                  <DateRangeStart>2021-12-15</DateRangeStart>")
        expect(rq).to.contain("<PTC>CNN</PTC>")
        expect(rq).to.contain("<PTC>ADT</PTC>")
        expect(rq).to.contain("<CabinTypeCode>Economy</CabinTypeCode>\n" +
            "                  <PrefLevel>\n" +
            "                    <PrefLevelCode>Required</PrefLevelCode>\n" +
            "                  </PrefLevel>")
        expect(rq).to.contain("<Carrier>\n" +
            "                <AirlineDesigCode>SU</AirlineDesigCode>\n" +
            "              </Carrier>\n" +
            "              <Carrier>\n" +
            "                <AirlineDesigCode>U6</AirlineDesigCode>\n" +
            "              </Carrier>")
    }
}