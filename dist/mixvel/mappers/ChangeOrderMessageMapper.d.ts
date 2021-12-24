import { MixvelMessageMapper } from "./MixvelMessageMapper";
import { Mixvel_OrderChangeRQ } from "../request/Mixvel_OrderChangeRQ";
import { TicketIssueParams } from "../../request-params/TicketIssueParams";
export declare class ChangeOrderMessageMapper implements MixvelMessageMapper {
    readonly params: TicketIssueParams;
    constructor(params: TicketIssueParams);
    map(): Mixvel_OrderChangeRQ;
}
