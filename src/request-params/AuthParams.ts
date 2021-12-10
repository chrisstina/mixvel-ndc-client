import {GenericRequestParams} from "./GenericRequestParams";

export class AuthParams implements GenericRequestParams {
    constructor(public login: string, public password: string, public structureId: string) {
    }
}