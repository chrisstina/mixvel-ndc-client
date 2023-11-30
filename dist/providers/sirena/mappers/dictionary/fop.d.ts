import { FopType } from "../../../../core/request/types";
import { CashPaymentMethod, InvoicePaymentMethod } from "../../messages/OrderChangeRQ";
export declare enum SirenaFop {
    CASH = "CA",
    INVOICE = "IN"
}
export declare function toSirenaType(fop: FopType): SirenaFop;
export declare function toSirenaMethod(fop: FopType, data?: string | Record<string, unknown>): CashPaymentMethod | InvoicePaymentMethod;
