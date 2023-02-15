import { FopType } from "../../../../core/request/types";
import { CardPaymentMethod, CashPaymentMethod, OtherPaymentMethod } from "../../messages/AirDocIssueRQ";
export declare enum TicketMeFop {
    CASH = "CA",
    CARD = "\u0421\u0421",
    OTHER = "MS"
}
export declare function toTicketMeType(fop: FopType): TicketMeFop;
export declare function toTicketMeMethod(fop: FopType): CardPaymentMethod | CashPaymentMethod | OtherPaymentMethod;
