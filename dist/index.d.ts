import { IProvider } from "./interfaces/IProvider";
import { IRequest } from "./interfaces/IRequest";
import { IResponseMessage } from "./interfaces/IResponseMessage";
import { IResponseError } from "./interfaces/IResponseError";
import { IDataList } from "./interfaces/IDataList";
import { Result } from "./core/Result";
import { AuthParams, AuthProps } from "./core/request/parameters/Auth";
import { SearchParams, SearchProps } from "./core/request/parameters/Search";
import { PriceParams, PriceProps } from "./core/request/parameters/Price";
import { OrderRetrieveParams, OrderRetrieveProps } from "./core/request/parameters/OrderRetrieve";
import { BookParams, BookProps } from "./core/request/parameters/Book";
import { TicketIssueParams, TicketIssueProps } from "./core/request/parameters/TicketIssue";
import { RefundParams, RefundProps } from "./core/request/parameters/Refund";
import { RepriceParams, RepriceProps } from "./core/request/parameters/Reprice";
import { OrderSplitParams, OrderSplitProps } from "./core/request/parameters/OrderSplit";
import { OrderChangeProps } from "./core/request/parameters/OrderChange";
import { AirlineProfileProps } from "./core/request/parameters/AirlineProfile";
export declare function createNDCService(provider: string | IProvider, providerConfig?: {}): {
    getAuthRequest: (props: AuthProps) => Result<IRequest>;
    getSearchRequest: (props: SearchProps) => Result<IRequest>;
    getPriceRequest: (props: PriceProps) => Result<IRequest>;
    getBookRequest: (props: BookProps) => Result<IRequest>;
    getRepriceRequest: (props: RepriceProps) => Result<IRequest>;
    getFareRulesRequest: (props: PriceProps | OrderRetrieveParams) => Result<IRequest>;
    getServiceListRequest: (props: PriceProps | OrderRetrieveProps) => Result<IRequest>;
    getServiceAddRequest: (props: OrderChangeProps) => Result<IRequest>;
    getOrderRetrieveRequest: (props: OrderRetrieveProps) => Result<IRequest>;
    getTicketIssueRequest: (props: TicketIssueProps) => Result<IRequest>;
    getOrderCancelRequest: (props: OrderRetrieveProps) => Result<IRequest>;
    getRefundCalculationRequest: (props: RefundProps) => Result<IRequest>;
    getRefundRequest: (props: RefundProps) => Result<IRequest>;
    getOrderSplitRequest: (props: OrderSplitProps) => Result<IRequest>;
    getAirlineProfileRequest: (props: AirlineProfileProps) => Result<IRequest>;
    getResponse: (data: string | {
        status: string;
        errors: string[];
        title: string;
    }) => Promise<Result<IResponseMessage | IResponseError>>;
    extractDataLists: (dataListSource: Record<string, unknown>[]) => {
        [key: string]: IDataList;
    };
    setProviderConfig: (providerConfig: Record<string, unknown>) => void;
    AuthParams: typeof AuthParams;
    SearchParams: typeof SearchParams;
    PriceParams: typeof PriceParams;
    BookParams: typeof BookParams;
    OrderRetrieveParams: typeof OrderRetrieveParams;
    OrderSplitParams: typeof OrderSplitParams;
    TicketIssueParams: typeof TicketIssueParams;
    RepriceParams: typeof RepriceParams;
    RefundParams: typeof RefundParams;
};
