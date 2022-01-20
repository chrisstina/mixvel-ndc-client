import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getAuthRequest} from "../src"

@suite
class AuthRequestUnitTest {
    @test 'Create auth request' () {
        const rq = getAuthRequest({login: "foo", password: "bar", structureId: "baz"}).getValue()
        expect(rq.body).contain('<Login>foo</Login>\n' +
            '        <Password>bar</Password>\n' +
            '        <StructureUnitID>baz</StructureUnitID>')
        expect(rq.options.endpoint).to.equal('api/Accounts/login')
        expect(rq.headers).to.have.property('accept')
    }

    @test 'Validate auth request' () {
        const result = getAuthRequest({login: "foo", password: "", structureId: ""})

        expect(result.isSuccess).to.be.false
        expect(result.error).to.contain('password must contain only letters')
        expect(() => {result.getValue()}).to.throw
    }
}