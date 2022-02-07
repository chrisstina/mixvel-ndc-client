import {suite, test} from "@testdeck/mocha";
import {expect} from "chai";

import {createNDCService} from "../src"

const {getSearchRequest} = createNDCService('mixvel')

let dateOut = new Date(), dateReturn = new Date()
dateOut.setDate(dateOut.getDate() + 50);
dateReturn.setDate(dateReturn.getDate() + 40);

@suite
class SearchRequestValidationUnitTest {
    @test 'Validate search request'() {
        let result = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: 30, id: "1"},
                {ptc: 'CHILD', age: 5, id: "2"}
            ],
            originDestinations: [],
            cabin: "ECONOMY",
            preferredCarriers: ['SU', 'U6']
        })

        expect(result.isSuccess).to.be.false
        expect(result.error).to.contain('originDestinations should not be empty')
        expect(() => {
            result.getValue()
        }).to.throw

        result = getSearchRequest({
            travelers: [],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: dateOut, dateRangeStart: dateOut},
                {from: "MOW", to: "LED", dateRangeEnd: dateReturn, dateRangeStart: dateReturn}
            ],
            cabin: "ECONOMY",
            preferredCarriers: null
        })

        expect(result.isSuccess).to.be.false
        expect(result.error).to.contain('travelers should not be empty')
        expect(() => {
            result.getValue()
        }).to.throw

        result = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: 30, id: "1"},
                {ptc: 'CHILD', age: 5, id: "2"}
            ],
            originDestinations: [
                {from: "invalid", to: "MOW", dateRangeEnd: dateOut, dateRangeStart: dateOut},
                {from: "MOW", to: "LED", dateRangeEnd: dateReturn, dateRangeStart: dateReturn}
            ],
            cabin: "ECONOMY",
            preferredCarriers: null
        })

        expect(result.isSuccess).to.be.false
        expect(result.error).to.contain('from must be shorter than or equal to 3 characters')
        expect(() => {
            result.getValue()
        }).to.throw

        result = getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: 30, id: "1"},
                {ptc: 'foo', age: 5, id: "2"}
            ],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: dateOut, dateRangeStart: dateOut},
                {from: "MOW", to: "LED", dateRangeEnd: dateReturn, dateRangeStart: dateReturn}
            ],
            cabin: "ECONOMY",
            preferredCarriers: null
        })

        expect(result.isSuccess).to.be.false
        expect(result.error).to.contain('ptc must be one of the following values')
        expect(() => {
            result.getValue()
        }).to.throw
    }
}