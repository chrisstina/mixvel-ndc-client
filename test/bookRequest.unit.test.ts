import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getBookRequest} from "../src"
import {BookParams} from "../dist/request/parameters";

@suite
class BookRequestUnitTest {
    @test 'Create Mixvel book RQ for 1ADT RT'() {
        const params: BookParams = {
            offerId: 'SOME-OFFER',
            offerItemIds: [{id: 'OFFER-1', ptc: "ADULT"}],
            passengers: [
                {
                    ptc: "ADULT",
                    personalInfo: {
                        firstName: 'Test',
                        middleName: 'Test',
                        lastName: 'Test',
                        gender: "M",
                        dob: new Date('1999-02-15'),
                    },
                    identityDocument: {
                        type: "PASSPORT",
                        dateOfIssue: new Date('2015-02-15'),
                        dateOfExpiry: new Date('2025-02-15'),
                        issuingCountry: 'RU',
                        number: '12345'
                    },
                    contacts: {
                        email: 'test@test.test',
                        phoneNumber: '89112311441'
                    }
                }
            ]
        }

        const rq = getBookRequest(params).body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderCreateRQ')
        expect(rq).to.contain('<OfferRefID>SOME-OFFER</OfferRefID>')
        expect(rq).to.contain('<OfferItemRefID>OFFER-1')

        console.log(rq)
    }
}