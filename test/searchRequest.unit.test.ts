import {suite, test} from '@testdeck/mocha';
import {expect} from 'chai';

import {getSearchRequest} from "../src"

@suite
class SearchRequestUnitTest {
    @test 'Basic test'() {
        expect(getSearchRequest({
            travelers: [
                {ptc: 'ADULT', age: "30", id: "1"},
                {ptc: 'CHILD', age: "5", id: "2"}
            ],
            originDestinations: [
                {from: "LED", to: "MOW", dateRangeEnd: "2021-12-12", dateRangeStart: "2021-12-12"},
                {from: "MOW", to: "LED", dateRangeEnd: "2021-12-15", dateRangeStart: "2021-12-15"}
            ],
            cabin: "ECONOMY"
        }))
    }
}