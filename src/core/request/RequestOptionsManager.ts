import {IRequestOptions, IRequestOptionsManager} from "../../interfaces/IRequestOptionsManager";

export class RequestOptionsManager implements IRequestOptionsManager {
    create(params: {
               endpoint: string,
               method?: "GET" | "POST",
               headers?: { [p: string]: any }
           }
    ): IRequestOptions {
        return {
            endpoint: params.endpoint,
            method: params.method || "POST",
            headers: params.headers || {
                "accept": "application/xml",
                "Content-Type": "application/xml"
            }
        }
    }
}