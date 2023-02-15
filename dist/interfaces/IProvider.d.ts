import { IRequestManager } from "./IRequestManager";
import { IResponseManager } from "./IResponseManager";
export interface IProvider {
    extraConfiguration: Record<string, any>;
    readonly requestManager: IRequestManager;
    readonly responseManager: IResponseManager;
}
