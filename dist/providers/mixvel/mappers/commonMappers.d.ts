import {FopType} from "../../../core/request/types";
import {DirectBill, OtherPaymentMethod} from "../messages/Mixvel_CommonTypes";

export declare function toMixvelDate(date: Date): string;
export declare function toAge(date: Date): string;
export declare function toFOP({ type, data, }: {
    type: FopType;
    data?: string | Record<string, unknown>;
}): OtherPaymentMethod | DirectBill;
