import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {getSearchRequest} = createNDCService('mixvel')

let dateOut = new Date(), dateReturn = new Date()
dateOut.setDate(dateOut.getDate() + 50);
dateReturn.setDate(dateReturn.getDate() + 40);

@suite
class SearchRequestUnitTest {

    @test 'Create Mixvel search RQ for 1ADT and 1CHD LED - MOW - LED ECONOMY'() {
        const request = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: 30, id: "1"},
                {ptc: 'CHILD', age: 5, id: "2"}
            ],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: dateOut, dateRangeStart: dateOut},
                {from: "MOW", to: "LED", dateRangeEnd: dateReturn, dateRangeStart: dateReturn}
            ],
            cabin: "ECONOMY",
            preferredCarriers: []
        })

        if (request.isFailure) {
            console.error(request.error)
        }

        expect(request.getValue().headers).to.have.property('accept')

        const rq = request.getValue().body
        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('shop:Mixvel_AirShoppingRQ')
        expect(rq).to.contain("<DestArrivalCriteria>\n                  <IATA_LocationCode>LED</IATA_LocationCode>")
        expect(rq).to.contain("<PTC>CNN</PTC>")
        expect(rq).to.contain("<PTC>ADT</PTC>")
        expect(rq).to.contain("<CabinTypeCode>Economy</CabinTypeCode>\n" +
            "                  <PrefLevel>\n" +
            "                    <PrefLevelCode>Required</PrefLevelCode>\n" +
            "                  </PrefLevel>")

        expect(rq).to.not.contain("ShoppingCriteria")

        expect(request.getValue().options.endpoint).to.equal('api/Order/airshopping')
    }

    @test 'Create Mixvel search RQ for 1ADT and 1CHD LED - MOW - LED ECONOMY with SU and U6 preferred'() {
        const rq = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: 30, id: "1"},
                {ptc: 'CHILD', age: 5, id: "2"}
            ],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: dateOut, dateRangeStart: dateOut},
                {from: "MOW", to: "LED", dateRangeEnd: dateReturn, dateRangeStart: dateReturn}
            ],
            cabin: "ECONOMY",
            preferredCarriers: ['SU', 'U6']
        }).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('shop:Mixvel_AirShoppingRQ')
        expect(rq).to.contain("<DestArrivalCriteria>\n                  <IATA_LocationCode>LED</IATA_LocationCode>")
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

        expect(rq).to.not.contain('Connection-1')
    }

    @test 'Create Mixvel search RQ for 1ADT with only direct filter'() {
        const rq = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: 30, id: "1"},
                {ptc: 'CHILD', age: 5, id: "2"}
            ],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: dateOut, dateRangeStart: dateOut},
                {from: "MOW", to: "LED", dateRangeEnd: dateReturn, dateRangeStart: dateReturn}
            ],
            cabin: "ECONOMY",
            preferredCarriers: [],
            onlyDirect: true
        }).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('shop:Mixvel_AirShoppingRQ')
        expect(rq).to.contain("<DestArrivalCriteria>\n                  <IATA_LocationCode>LED</IATA_LocationCode>")
        expect(rq).to.contain("<PTC>ADT</PTC>")
        expect(rq).to.contain("<CabinTypeCode>Economy</CabinTypeCode>\n" +
            "                  <PrefLevel>\n" +
            "                    <PrefLevelCode>Required</PrefLevelCode>\n" +
            "                  </PrefLevel>")
        expect(rq).to.contain('<MaximumConnectionQty>1</MaximumConnectionQty>')
    }

    @test 'Create Mixvel search RQ for 1ADT and 1CHD LED - MOW - LED ECONOMY with SU and U6 preferred only direct'() {
        const rq = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: 30, id: "1"},
                {ptc: 'CHILD', age: 5, id: "2"}
            ],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: dateOut, dateRangeStart: dateOut},
                {from: "MOW", to: "LED", dateRangeEnd: dateReturn, dateRangeStart: dateReturn}
            ],
            cabin: "ECONOMY",
            preferredCarriers: ['SU', 'U6'],
            onlyDirect: true
        }).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('shop:Mixvel_AirShoppingRQ')
        expect(rq).to.contain("<DestArrivalCriteria>\n                  <IATA_LocationCode>LED</IATA_LocationCode>")
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

        expect(rq).to.contain('Connection-1')
    }
}