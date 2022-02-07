import { IRequestOptions, IRequestOptionsManager } from "../interfaces/IRequestOptionsManager";
export declare class RequestOptionsManager implements IRequestOptionsManager {
    create(params: {
        endpoint: string;
        method?: "GET" | "POST";
        headers?: {
            [p: string]: any;
        };
    }): IRequestOptions;
}
