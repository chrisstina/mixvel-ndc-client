import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {createNDCService} from "../../src"
import {BookProps} from "../../src/core/request/parameters/Book";

const {getBookRequest} = createNDCService('mixvel')

@suite
class BookRequestUnitTest {
    @test 'Create Mixvel book RQ for 1ADT RT'() {
        const params: BookProps = {
            offer: {
                offerId: 'SOME-OFFER',
                offerItems: [{offerItemId: 'OFFER-1', ptc: "ADULT"}]
            },
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
                        type: "REGULAR_PASSPORT_RU",
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

        const rq = getBookRequest(params).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderCreateRQ')
        expect(rq).to.contain('<OfferRefID>SOME-OFFER</OfferRefID>')
        expect(rq).to.contain('<OfferItemRefID>OFFER-1')
        expect(rq).to.contain('<PaxID>Pax_1</PaxID>\n                <PTC>ADT</PTC>')
        expect(rq).to.contain('<MiddleName>Test</MiddleName>\n                  <Surname>Test</Surname>')
    }

    @test 'Create Mixvel book RQ for 1ADT RT with no middlename'() {
        const params: BookProps = {
            offer: {
                offerId: 'SOME-OFFER',
                offerItems: [{offerItemId: 'OFFER-1', ptc: "ADULT"}]
            },
            passengers: [
                {
                    ptc: "ADULT",
                    personalInfo: {
                        firstName: 'Test',
                        lastName: 'Test',
                        gender: "M",
                        dob: new Date('1999-02-15'),
                    },
                    identityDocument: {
                        type: "REGULAR_PASSPORT_RU",
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

        const rq = getBookRequest(params).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderCreateRQ')
        expect(rq).to.contain('<OfferRefID>SOME-OFFER</OfferRefID>')
        expect(rq).to.contain('<OfferItemRefID>OFFER-1')
        expect(rq).to.contain('<PaxID>Pax_1</PaxID>\n                <PTC>ADT</PTC>')
        expect(rq).to.contain('<GivenName>Test</GivenName>\n                  <Surname>Test</Surname>')
    }

    @test 'Create Mixvel book RQ for 2ADT 1CHD 1INF RT'() {
        const params: BookProps = {
            offer: {
                offerId: 'SOME-OFFER',
                offerItems: [
                    {offerItemId: 'OFFER-1', ptc: "ADULT"},
                    {offerItemId: 'OFFER-2', ptc: "CHILD"},
                    {offerItemId: 'OFFER-3', ptc: "INFANT"}
                ]
            },
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
                        type: "REGULAR_PASSPORT_RU",
                        dateOfIssue: new Date('2015-02-15'),
                        dateOfExpiry: new Date('2025-02-15'),
                        issuingCountry: 'RU',
                        number: '12345'
                    },
                    contacts: {
                        email: 'test@test.test',
                        phoneNumber: '89112311441'
                    }
                },
                {
                    ptc: "ADULT",
                    personalInfo: {
                        firstName: 'TestTwo',
                        middleName: 'TestTwo',
                        lastName: 'TestTwo',
                        gender: "F",
                        dob: new Date('1999-03-15'),
                    },
                    identityDocument: {
                        type: "REGULAR_PASSPORT_RU",
                        dateOfIssue: new Date('2015-02-15'),
                        dateOfExpiry: new Date('2025-02-15'),
                        issuingCountry: 'RU',
                        number: '12346'
                    },
                    contacts: {
                        email: 'test@test.test',
                        phoneNumber: '89112311441'
                    }
                },
                {
                    ptc: "CHILD",
                    personalInfo: {
                        firstName: 'TestChild',
                        middleName: 'TestTwo',
                        lastName: 'TestTwo',
                        gender: "F",
                        dob: new Date('2015-03-15'),
                    },
                    identityDocument: {
                        type: "BIRTHDAY_CERTIFICATE",
                        dateOfIssue: new Date('2015-04-15'),
                        dateOfExpiry: new Date('2025-02-15'),
                        issuingCountry: 'RU',
                        number: '12346'
                    },
                    contacts: {
                        // email: 'test@test.test',
                        phoneNumber: '89112311441'
                    }
                },
                {
                    ptc: "INFANT",
                    personalInfo: {
                        firstName: 'TestInfant',
                        middleName: 'TestTwo',
                        lastName: 'TestTwo',
                        gender: "F",
                        dob: new Date('2020-05-15'),
                    },
                    identityDocument: {
                        type: "BIRTHDAY_CERTIFICATE",
                        dateOfIssue: new Date('2020-05-15'),
                        dateOfExpiry: new Date('2025-02-15'),
                        issuingCountry: 'RU',
                        number: '12346'
                    },
                    contacts: {}
                }
            ]
        }
        const rq = getBookRequest(params).getValue().body

        expect(rq).to.not.contain('undefined')
        expect(rq).to.contain('Mixvel_OrderCreateRQ')
        expect(rq).to.contain('<OfferRefID>SOME-OFFER</OfferRefID>')

        expect(rq).to.contain('<OfferItemRefID>OFFER-1')
        expect(rq).to.contain('<OfferItemRefID>OFFER-2')
        expect(rq).to.contain('<OfferItemRefID>OFFER-3')

        expect(rq).to.contain('<PaxID>Pax_1</PaxID>\n                <PTC>ADT</PTC>')
        expect(rq).to.contain('<PaxID>Pax_1</PaxID>\n                <PTC>ADT</PTC>')
        expect(rq).to.contain('<PaxID>Pax_3</PaxID>\n                <PTC>CNN</PTC>')
        expect(rq).to.contain('<PaxID>Pax_4</PaxID>\n                <PTC>INF</PTC>')
    }
}