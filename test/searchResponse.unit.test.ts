import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';
import {readFile} from 'fs/promises'

import {getResponse} from "../src";

@suite
class SearchResponseUnitTest {
    @test async 'Parse Mixvel search response'() {
        const xml = await readFile('./test/mixvel-responses/search/1ADT.xml');
        const rs = await getResponse(xml.toString());

        expect(rs.isSuccess).to.be.true
        expect(rs.getValue()).to.have.property('DataLists')
        expect(rs.getValue()).to.have.property('OffersGroup')
        expect(rs.getValue().OffersGroup[0].CarrierOffers[0].Offer).to.be.lengthOf(192)
    }
}