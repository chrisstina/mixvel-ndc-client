import { AbstractRequestParams } from "../../../../core/request/parameters/AbstractRequestParams";
import { BookProps } from "../../../../core/request/parameters/Book";
import { TicketMeOffer } from "./Price";
import { Result } from "../../../../core/Result";
export declare class TicketMeBookParams extends AbstractRequestParams {
    offer: TicketMeOffer;
    private constructor();
    static create(props: BookProps): Result<TicketMeBookParams>;
}
