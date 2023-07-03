"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FareRulesMessageMapper = void 0;
var typeguards_1 = require("../../../core/request/typeguards");
var metadataTypes_1 = require("../constants/metadataTypes");
var FareRulesRQ_1 = require("../messages/FareRulesRQ");
function generateRuleReference(id) {
    return "RM".concat(id);
}
var FareRulesMessageMapper = /** @class */ (function () {
    function FareRulesMessageMapper(params, credentials) {
        this.params = params;
        this.credentials = credentials;
    }
    FareRulesMessageMapper.prototype.map = function () {
        var message = new FareRulesRQ_1.FareRulesRQ();
        if ((0, typeguards_1.isPriceParams)(this.params)) {
            var oiIdx = 0;
            var ruleRef = generateRuleReference(oiIdx + 1);
            var fareRuleOpts = this.params.offers[0].offerItems[oiIdx].opts.fareRule;
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
                                                    RuleID: [{ _: metadataTypes_1.FARE_RULES_LOCATOR }],
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
    };
    return FareRulesMessageMapper;
}());
exports.FareRulesMessageMapper = FareRulesMessageMapper;
