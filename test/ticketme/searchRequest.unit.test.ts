import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"

const {getSearchRequest} = createNDCService('ticketme', {party: {agencyId: 'YOUR_KASSA'}})

let dateOut = new Date(), dateReturn = new Date()
dateOut.setDate(dateOut.getDate() + 50);
dateReturn.setDate(dateReturn.getDate() + 40);

@suite
class SearchRequestUnitTest {

    @test 'Create TicketMe for 1ADT and 1CHD LED - MOW - LED search request'() {
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
        const rq = request.getValue().body

        expect(rq).to.not.contain('undefined')

        expect(rq).to.contain('<AirShoppingRQ')
        expect(rq).to.contain('Version="17.2"')
        expect(rq).to.contain('<AgencyID>YOUR_KASSA</AgencyID>')
        expect(rq).to.contain('<Departure>\n' +
            '\t\t\t\t\t<AirportCode>LED</AirportCode>\n' +
            '\t\t\t\t\t<Date>2022-03-26</Date>\n' +
            '\t\t\t\t</Departure>')
        expect(rq).to.contain('<Arrival>\n' +
            '\t\t\t\t\t<AirportCode>MOW</AirportCode>\n' +
            '\t\t\t\t</Arrival>')
        expect(rq).to.contain('<Departure>\n' +
            '\t\t\t\t\t<AirportCode>MOW</AirportCode>\n' +
            '\t\t\t\t\t<Date>2022-03-16</Date>\n' +
            '\t\t\t\t</Departure>')
        expect(rq).to.contain('<Departure>\n' +
            '\t\t\t\t\t<AirportCode>MOW</AirportCode>\n' +
            '\t\t\t\t\t<Date>2022-03-16</Date>\n' +
            '\t\t\t\t</Departure>\n' +
            '\t\t\t\t<Arrival>\n' +
            '\t\t\t\t\t<AirportCode>LED</AirportCode>\n' +
            '\t\t\t\t</Arrival>')
        expect(rq).to.contain('<Passenger PassengerID="PAX1">')
        expect(rq).to.contain('<Passenger PassengerID="PAX2">')
        expect(rq).to.contain('ADT')
        expect(rq).to.contain('CNN')
    }

    @test 'Create TicketMe search RQ for 1ADT and 1CHD LED - MOW - LED with SU and U6 preferred'() {
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

        expect(rq).to.contain('<AirShoppingRQ')
        expect(rq).to.contain('Version="17.2"')
        expect(rq).to.contain('<AgencyID>YOUR_KASSA</AgencyID>')
        expect(rq).to.contain('<Departure>\n' +
            '\t\t\t\t\t<AirportCode>LED</AirportCode>\n' +
            '\t\t\t\t\t<Date>2022-03-26</Date>\n' +
            '\t\t\t\t</Departure>')
        expect(rq).to.contain('<Arrival>\n' +
            '\t\t\t\t\t<AirportCode>MOW</AirportCode>\n' +
            '\t\t\t\t</Arrival>')
        expect(rq).to.contain('<Departure>\n' +
            '\t\t\t\t\t<AirportCode>MOW</AirportCode>\n' +
            '\t\t\t\t\t<Date>2022-03-16</Date>\n' +
            '\t\t\t\t</Departure>')
        expect(rq).to.contain('<Departure>\n' +
            '\t\t\t\t\t<AirportCode>MOW</AirportCode>\n' +
            '\t\t\t\t\t<Date>2022-03-16</Date>\n' +
            '\t\t\t\t</Departure>\n' +
            '\t\t\t\t<Arrival>\n' +
            '\t\t\t\t\t<AirportCode>LED</AirportCode>\n' +
            '\t\t\t\t</Arrival>')

        expect(rq).to.contain('<Passenger PassengerID="PAX1">')
        expect(rq).to.contain('<Passenger PassengerID="PAX2">')
        expect(rq).to.contain('ADT')
        expect(rq).to.contain('CNN')

        expect(rq).to.contain('<AirlinePreferences>\n\t\t\t<Airline PreferencesLevel="Preferred">\n\t\t\t\t<AirlineID>SU')
        expect(rq).to.contain('Airline PreferencesLevel="Preferred">\n\t\t\t\t<AirlineID>U6')

        console.log(rq)
    }
}