import { IConversionStrategy } from "./IConversionSrategy";

const xml2json = require("ndc-xml2json");

export class XmlNDCToObjectConversionStrategy implements IConversionStrategy {
  constructor(public readonly ndcVersion: string) {}

  execute(payload: Record<string, any>): Promise<Record<string, any>> | null {
    const json = xml2json(payload, this.ndcVersion);
    if (json === -1) {
      console.error("xml2json failed to parse response");
      return null;
    }
    return json;
  }
}
