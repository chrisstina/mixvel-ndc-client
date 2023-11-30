import { AbstractRequestParams, RequestProps } from "./AbstractRequestParams";
import { PaxCategory } from "../types";
import { Result } from "../../Result";
import { PersonalInfo } from "./Book";
export declare class OfferItem {
    offerItemId: string;
    readonly paxRefs: string[];
    readonly segmentRefs: string[];
    readonly quantity?: number;
    constructor(id: string, paxRefs?: string[], segmentRefs?: string[], quantity?: number);
}
export declare class Offer {
    readonly offerId: string;
    offerItems: OfferItem[];
    readonly offerOwner?: string;
    readonly responseId?: string;
    constructor(offerId: string, offerItems: OfferItem[], offerOwner?: string, responseId?: string);
}
export declare type OrderChangeProps = RequestProps<OrderChangeParams>;
export declare class OrderPassenger {
    readonly id?: string | undefined;
    readonly infantRef?: string | undefined;
    readonly ptc: PaxCategory;
    personalInfo: PersonalInfo;
    constructor(ptc: PaxCategory, personalInfo: {
        firstName: string;
        lastName: string;
        middleName?: string;
        dob: Date;
    }, id?: string | undefined, infantRef?: string | undefined);
}
export declare class OrderChangeParams extends AbstractRequestParams {
    readonly orderId: string;
    readonly orderOwner: string;
    readonly offers: Offer[];
    readonly passengers?: OrderPassenger[];
    private constructor();
    static create(props: OrderChangeProps): Result<OrderChangeParams>;
    /**
     * @return {offerId: string, offerItemIds: string[]}
     */
    asPlain(): {
        offerId: string;
        offerItemIds: string[];
    };
}
