import {IConversionStrategy} from "./IConversionSrategy";

const xml2js = require('xml2js'),
    xmlParser = new xml2js.Parser()

export class XmlToObjectConversionStrategy implements IConversionStrategy{
    execute(payload: Object): Promise<Object> {
        return xmlParser.parseStringPromise(payload)
    }
}