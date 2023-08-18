const xml2js = require("xml2js");
import { IConversionStrategy } from "./IConversionSrategy";

export class ObjectToXmlConversionStrategy implements IConversionStrategy {
  private xmlBuilder = new xml2js.Builder();

  execute(payload: Record<string, unknown>): string | null {
    try {
      return this.xmlBuilder.buildObject(payload);
    } catch (e: any) {
      console.error(
        "Could not perform conversion, see error stack: " + e.stack
      );
      return null;
    }
  }
}
