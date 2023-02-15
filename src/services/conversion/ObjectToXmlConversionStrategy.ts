const xml2js = require("xml2js");
import { IConversionStrategy } from "./IConversionSrategy";

export class ObjectToXmlConversionStrategy implements IConversionStrategy {
  private xmlBuilder = new xml2js.Builder();

  execute(payload: Record<string, unknown>): string {
    return this.xmlBuilder.buildObject(payload);
  }
}
