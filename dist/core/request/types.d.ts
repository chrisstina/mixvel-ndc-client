export declare type NodeValue<T> = {
    _: T;
};
export declare type StringValue = NodeValue<string>;
export declare type Cabin = "ECONOMY" | "BUSINESS";
export declare type PaxCategory = "ADULT" | "CHILD" | "INFANT" | "WSEATINFANT" | "YOUTH" | "SENIOR" | "DISABLED" | "DISABLEDCHILD" | "ESCORT" | "LARGEFAMILY" | "STATERESIDENT";
export declare type DocumentType = "REGULAR_PASSPORT_RU" | "BIRTHDAY_CERTIFICATE" | "INTERNATIONAL_PASSPORT_RU" | "NATIONAL_PASSPORT" | "OFFICER_ID" | "TEMPORARY_ID" | "MILITARY_ID" | "RESIDENCE" | "SEAMAN_ID" | "RETURN_ID";
export declare type FopType = "CASH" | "BILL" | "CARD";
export declare type PricingOption = "LOWEST_FARE" | "ALL_FARES";
export declare type Party = {
    Sender: {
        TravelAgencySender: {
            Contacts?: [
                {
                    Contact: {
                        $: {
                            ContactType: "Agency";
                        };
                        EmailContact: {
                            Application: {
                                _: "EMAIL";
                            }[];
                            Address: {
                                _: string;
                            }[];
                        }[];
                        PhoneContact: {
                            Application: {
                                _: "PHONE";
                            }[];
                            Number: {
                                _: string;
                            }[];
                        }[];
                    };
                }
            ];
            AgencyID: {
                _: string;
            }[];
        }[];
    }[];
}[];
