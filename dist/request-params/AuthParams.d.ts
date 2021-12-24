import { GenericRequestParams } from "./GenericRequestParams";
/**
 * @typedef AuthParams
 * @property {string} login
 * @property {string} password
 * @property {string} structureId
 */
export declare class AuthParams implements GenericRequestParams {
    login: string;
    password: string;
    structureId: string;
    constructor(login: string, password: string, structureId: string);
}
