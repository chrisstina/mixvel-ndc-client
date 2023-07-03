import { IMessageMapper } from "../../../interfaces/IMessageMapper";
import { OrderRetrieveParams } from "../../../core/request/parameters/OrderRetrieve";
import { isPriceParams } from "../../../core/request/typeguards";
import { FARE_RULES_LOCATOR } from "../constants/metadataTypes";
import { SirenaPriceParams } from "../request/parameters/Price";
import { FareRulesRQ } from "../messages/FareRulesRQ";
import { PartyCredentials } from "../SirenaRequest";

function generateRuleReference(id: number): string {
  return `RM${id}`;
}

export class FareRulesMessageMapper implements IMessageMapper {
  constructor(
    public readonly params: SirenaPriceParams | OrderRetrieveParams,
    public readonly credentials: PartyCredentials
  ) {}

  map(): FareRulesRQ {
    const message = new FareRulesRQ();
    if (isPriceParams(this.params)) {
      const oiIdx = 0;
      const ruleRef = generateRuleReference(oiIdx + 1);
      const fareRuleOpts =
        this.params.offers[0].offerItems[oiIdx].opts.fareRule;
      message.Query[0] = {
        Departure: [
          {
            AirportCode: [{ _: fareRuleOpts.from }],
            Date: [{ _: fareRuleOpts.date }],
          },
        ],
        Arrival: [
          {
            AirportCode: [{ _: fareRuleOpts.to }],
          },
        ],
        AirlineID: [{ _: fareRuleOpts.carrier }],
        FareBasisCode: [{ Code: [{ _: fareRuleOpts.fareBasisCode }] }],
        FareReferenceKey: [{ _: ruleRef }],
      };

      message.Metadata = [
        {
          Other: [
            {
              OtherMetadata: [
                {
                  RuleMetadatas: [
                    {
                      RuleMetadata: [
                        {
                          $: { MetadataKey: ruleRef },
                          RuleID: [{ _: FARE_RULES_LOCATOR }],
                          Values: [
                            {
                              Value: [
                                {
                                  Instruction: [
                                    { _: fareRuleOpts.fareRuleLocator },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    }
    message.addParty(this.credentials);
    return message;
  }
}
