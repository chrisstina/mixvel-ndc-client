import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"
import {readFile} from "fs/promises";

const {getResponse, extractDataLists} = createNDCService('ticketme')

@suite
class BookResponseUnitTest {
    @test async 'Parse book RS'() {
        const xml = await readFile('./test/ticketme-responses/book/sample.xml');
        const rs = await getResponse(xml.toString());
        expect(rs.isSuccess).to.be.true
        const orderViewRS = rs.getValue()['ns2:OrderViewRS']
        const dl = extractDataLists(orderViewRS['ns2:Response'][0]['ns2:DataLists'])
        expect(dl.contactList.list).to.be.lengthOf(2)
    }
}