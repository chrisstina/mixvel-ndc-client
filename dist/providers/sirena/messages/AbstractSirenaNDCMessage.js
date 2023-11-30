"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSirenaNDCMessage = void 0;
var AbstractSirenaNDCMessage = /** @class */ (function () {
    function AbstractSirenaNDCMessage() {
        this.$ = {
            Version: "17.2",
        };
        this.Document = {};
        this.Party = [];
    }
    Object.defineProperty(AbstractSirenaNDCMessage.prototype, "nodeName", {
        get: function () {
            return "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractSirenaNDCMessage.prototype, "xmlns", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    AbstractSirenaNDCMessage.prototype.addParty = function (party) {
        this.Party.push({
            Sender: [{ TravelAgencySender: [{ AgencyID: [{ _: party.agencyId }] }] }],
        });
        if (party.contacts) {
            this.Party[0].Sender[0].TravelAgencySender[0].Contacts = [
                {
                    Contact: {
                        $: { ContactType: "Agency" },
                        EmailContact: [
                            {
                                Application: [{ _: "EMAIL" }],
                                Address: [{ _: party.contacts.email }],
                            },
                        ],
                        PhoneContact: [
                            {
                                Application: [{ _: "PHONE" }],
                                Number: [{ _: party.contacts.phone }],
                            },
                        ],
                    },
                },
            ];
        }
    };
    return AbstractSirenaNDCMessage;
}());
exports.AbstractSirenaNDCMessage = AbstractSirenaNDCMessage;
