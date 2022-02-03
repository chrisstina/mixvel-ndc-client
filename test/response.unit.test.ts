import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";
import {readFile} from "fs/promises";

import {createNDCService} from "../src";
const {getResponse} = createNDCService('mixvel')

@suite
class ResponseUnitTest {

    @test async 'Handle parsing errors for response'() {
        const rs1 = await getResponse('')
        expect(rs1.isSuccess).to.be.false
        expect(rs1.error).to.contain('Response parsed to an empty object')

        const rs2 = await getResponse({
            "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            "title": "One or more validation errors occurred.",
            "status": 400,
            "traceId": "00-fa9510d14bd5ea4291fa99111c212493-53d4855e8930b64f-01",
            "errors": {
                "Request.DataLists.ContactInfoList[2].Phone[0].PhoneNumber": [
                    "The PhoneNumber field is required."
                ]
            }
        })
        expect(rs2.isSuccess).to.be.false
        expect(rs2.error).to.contain('One or more validation errors occurred')

        const xml = await readFile('./test/mixvel-responses/error/order-error.xml');
        const rs3 = await getResponse(xml.toString())
        expect(rs3.isSuccess).to.be.true
        expect(rs3.getValue()).to.have.property('Code')
    }
}