import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { OriginDestination } from "./AirShoppingRQ";

export class FareRulesRQ extends AbstractSirenaNDCMessage {
  public Query: (OriginDestination & {
    FareBasisCode: { Code: StringValue[] }[];
    AirlineID: StringValue[];
    FareReferenceKey: StringValue[];
  })[] = [
    {
      Departure: [],
      Arrival: [],
      AirlineID: [],
      FareBasisCode: [],
      FareReferenceKey: [],
    },
  ];
  public Metadata: {
    Other: {
      OtherMetadata: {
        RuleMetadatas: {
          RuleMetadata: {
            $: { MetadataKey: string};
            RuleID: StringValue[];
            Values: { Value: { Instruction: StringValue[] }[] }[];
          }[];
        }[];
      }[];
    }[];
  }[] = [];

  get nodeName() {
    return "FareRulesRQ";
  }
}
