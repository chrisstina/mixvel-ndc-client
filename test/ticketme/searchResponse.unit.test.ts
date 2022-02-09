import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';
import {readFile} from 'fs/promises'

import {createNDCService} from "../../src"

const {getResponse} = createNDCService('ticketme')

@suite
class SearchResponseUnitTest {
    @test async 'Parse Ticketme search response'() {
        const xml = await readFile('./test/ticketme-responses/sample.xml');
        const rs = await getResponse(xml.toString());

        expect(rs.isSuccess).to.be.true

        const airShoppongRS = rs.getValue()['ns2:AirShoppingRS']

        expect(airShoppongRS).to.have.property('ns2:DataLists')
        expect(airShoppongRS).to.have.property('ns2:OffersGroup')
        expect(airShoppongRS['ns2:OffersGroup'][0]['ns2:AirlineOffers'][0]['ns2:Offer']).to.be.lengthOf(1)
    }

    @test async 'Parse Ticketme error search response'() {
        const xml = await readFile('./test/ticketme-responses/sample-error.xml');
        const rs = await getResponse(xml.toString());

        expect(rs.isSuccess).to.be.true

        const airShoppongRS = rs.getValue()
        expect(airShoppongRS).to.have.property('text').equals('Airline does not operate at requested Departure airport: MOW')
    }
}