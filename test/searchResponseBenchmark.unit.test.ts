import {suite, test} from "@testdeck/mocha";
import fs from "fs";

import {createNDCService} from "../src";

@suite
class SearchResponseBenchmarkUnitTest {
    @test async 'Parse Mixvel search request'() {
        const {getResponse} = createNDCService('mixvel')
        const xml = await fs.promises.readFile('./test/mixvel-responses/search/2ADT1CHD1INF-RT.xml')
        console.time('mixvel-parse')
        const res = await getResponse(xml.toString())
        console.timeEnd('mixvel-parse')
    }

    @test async 'Parse Ticketme search request'() {
        const {getResponse} = createNDCService('ticketme')
        const xml = await fs.promises.readFile('./test/ticketme-responses/search/2ADT1CHD1INF-RT.xml')
        console.time('tm-parse')
        const res = await getResponse(xml.toString())
        console.timeEnd('tm-parse')
    }
}