import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";
/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
export declare class AirlineProfileRQ extends AbstractSirenaNDCMessage {
    Query: {
        ProfileOwner: StringValue[];
    };
    constructor(airline: string);
    get nodeName(): string;
}
