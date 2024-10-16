import { OrderRetrieveParams } from "../../core/request/parameters/OrderRetrieve";

const json2xml = require("ndc-json2xml");
import { IConversionStrategy } from "./IConversionSrategy";

/**
 * Uses IATA NDC JSON to XML converter, compatible to NDC versions up to 18.2
 */
export class ObjectToXmlNDCConversionStrategy implements IConversionStrategy {
  /**
   * @param {string} ndcVersion e.g. 172 for NDC 17.2, 182 for NDC 18.2
   */
  constructor(public readonly ndcVersion: string) {}

  execute(payload: Record<string, unknown>): string | null {
    const xmlPayload = json2xml(payload, this.ndcVersion);
    if (xmlPayload === -1) {
      console.error("json2xml failed to create request");
      return null;
    }
    return xmlPayload;
  }
}
