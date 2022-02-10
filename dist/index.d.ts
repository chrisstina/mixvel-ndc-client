import { IProvider } from "./interfaces/IProvider";
import { IRequest } from "./interfaces/IRequest";
import { IResponseMessage } from "./interfaces/IResponseMessage";
import { IResponseError } from "./interfaces/IResponseError";
import { Result } from "./core/Result";
import { AuthProps } from "./core/request/parameters/Auth";
import { SearchProps } from "./core/request/parameters/Search";
import { PriceProps } from "./core/request/parameters/Price";
import { OrderRetrieveProps } from "./core/request/parameters/OrderRetrieve";
import { BookProps } from "./core/request/parameters/Book";
import { TicketIssueProps } from "./core/request/parameters/TicketIssue";
import { RefundProps } from "./core/request/parameters/Refund";
import { DataList } from "./providers/mixvel/DataList";
export declare function createNDCService(provider: string | IProvider, providerConfig?: {}): {
    getAuthRequest: (props: AuthProps) => Result<IRequest>;
    getSearchRequest: (props: SearchProps) => Result<IRequest>;
    getPriceRequest: (props: PriceProps) => Result<IRequest>;
    getBookRequest: (props: BookProps) => Result<IRequest>;
    getFareRulesRequest: (props: PriceProps) => Result<IRequest>;
    getServiceListRequest: (props: PriceProps) => Result<IRequest>;
    getOrderRetrieveRequest: (props: OrderRetrieveProps) => Result<IRequest>;
    getTicketIssueRequest: (props: TicketIssueProps) => Result<IRequest>;
    getOrderCancelRequest: (props: OrderRetrieveProps) => Result<IRequest>;
    getRefundCalculationRequest: (props: OrderRetrieveProps) => Result<IRequest>;
    getRefundRequest: (props: RefundProps) => Result<IRequest>;
    getResponse: (data: string | {
        status: string;
        errors: string[];
        title: string;
    }) => Promise<Result<IResponseMessage | IResponseError>>;
    extractDataLists: (dataListSource: Record<string, unknown>[]) => {
        [key: string]: DataList;
    };
    setProviderConfig: (providerConfig: Record<string, unknown>) => void;
};
