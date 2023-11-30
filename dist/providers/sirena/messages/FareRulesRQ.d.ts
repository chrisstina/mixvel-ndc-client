import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
import { OriginDestination } from "./AirShoppingRQ";
export declare class FareRulesRQ extends AbstractSirenaNDCMessage {
    Query: (OriginDestination & {
        FareBasisCode: {
            Code: StringValue[];
        }[];
        AirlineID: StringValue[];
        FareReferenceKey: StringValue[];
    })[];
    Metadata: {
        Other: {
            OtherMetadata: {
                RuleMetadatas: {
                    RuleMetadata: {
                        $: {
                            MetadataKey: string;
                        };
                        RuleID: StringValue[];
                        Values: {
                            Value: {
                                Instruction: StringValue[];
                            }[];
                        }[];
                    }[];
                }[];
            }[];
        }[];
    }[];
    get nodeName(): string;
}
