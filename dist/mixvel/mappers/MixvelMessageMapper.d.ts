import { GenericNDCMessage } from "../request/GenericNDCMessage";
import { GenericRequestParams } from "../../request-params/GenericRequestParams";
export interface MixvelMessageMapper {
    params: GenericRequestParams;
    map(): GenericNDCMessage;
}
