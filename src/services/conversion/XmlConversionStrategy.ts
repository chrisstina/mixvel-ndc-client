const xml2js = require('xml2js')
import {IConversionStrategy} from "./IConversionSrategy";

export class XmlConversionStrategy implements IConversionStrategy {
    private xmlBuilder = new xml2js.Builder()

    execute(payload: Object): string {
        return this.xmlBuilder.buildObject(payload)
    }
}