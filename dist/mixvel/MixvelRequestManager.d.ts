import { IConversionStrategy } from "../services/conversion/IConversionSrategy";
import { SearchParams, BookParams, OrderRetrieveParams, PriceParams, TicketIssueParams } from "../request/parameters";
import { MixvelRequest } from "./MixvelRequest";
import { AbstractParamsValidator } from "../request/validators/AbstractParamsValidator";
import { MixvelMessageMapper } from "./mappers/MixvelMessageMapper";
import { GenericNDCMessage } from "./messages/GenericNDCMessage";
export declare class MixvelEndpointManager {
    endpoints: any;
    getEndpointForMessage(message: GenericNDCMessage): string | never;
    getEndpointByKey(id: string): string | never;
}
export declare class MixvelRequestManager {
    conversionStrategy: IConversionStrategy;
    endpointManager: MixvelEndpointManager;
    constructor(conversionStrategy: IConversionStrategy);
    createAuthRequest(params: {
        login: string;
        password: string;
        structureId: string;
    }): MixvelRequest;
    createSearchRequest(params: SearchParams): MixvelRequest;
    createPriceRequest(params: PriceParams): MixvelRequest;
    createBookRequest(params: BookParams): MixvelRequest;
    createOrderRetrieveRequest(params: OrderRetrieveParams): MixvelRequest;
    createOrderCancelRequest(params: OrderRetrieveParams): MixvelRequest;
    createTicketIssueRequest(params: TicketIssueParams): MixvelRequest;
    protected createRequest(params: object, options: {
        mapper: MixvelMessageMapper;
        validator?: typeof AbstractParamsValidator;
    }): MixvelRequest;
}
