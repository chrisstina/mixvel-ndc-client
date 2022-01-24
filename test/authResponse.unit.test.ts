import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';
import {readFile} from 'fs/promises'

import {getResponse} from "../src";

@suite
class AuthResponseUnitTest {
    @test async 'Parse Mixvel auth response'() {
        const xml = await readFile('./test/mixvel-responses/auth/success.xml');
        const rs = await getResponse(xml.toString());
        expect(rs.isSuccess).to.be.true
        expect(rs.getValue()).to.have.property('Token')
    }
}