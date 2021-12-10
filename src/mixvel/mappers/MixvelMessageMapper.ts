import {GenericNDCMessage} from "../request/GenericNDCMessage";
import {GenericRequestParams} from "../../request-params/GenericRequestParams";

export interface MixvelMessageMapper {
    map(params: GenericRequestParams): GenericNDCMessage
}