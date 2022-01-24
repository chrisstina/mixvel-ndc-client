import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import {readFile} from "fs/promises";

import {getResponse} from "../src";

@suite
class ResponseUnitTest {

    @test async 'Handle parsing errors for response'() {
        const rs1 = await getResponse('')
        expect(rs1.isSuccess).to.be.false
        expect(rs1.error).to.contain('Response parsed to an empty object')

        const rs2 = await getResponse({"status": "403", "errors": ["foo", "bar"], "title": "error title"})
        expect(rs2.isSuccess).to.be.false
        expect(rs2.error).to.contain('error title')

        const xml = await readFile('./test/mixvel-responses/error/order-error.xml');
        const rs3 = await getResponse(xml.toString())
        expect(rs3.isSuccess).to.be.true
        expect(rs3.getValue()).to.have.property('Code')
    }
}