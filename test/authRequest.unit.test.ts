import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getAuthRequest} from "../src"

@suite
class AuthRequestUnitTest {
    @test 'Create auth request' () {
        const rq = getAuthRequest({login: "foo", password: "bar", structureId: "baz"})
        expect(rq.toXML()).contain('<Login>foo</Login>\n' +
            '        <Password>bar</Password>\n' +
            '        <StructureUnitID>baz</StructureUnitID>')
        expect(rq.url).to.equal('api/Accounts/login')
    }
}