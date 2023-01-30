import { IRequestManager } from "../interfaces/IRequestManager";
import { IResponseManager } from "../interfaces/IResponseManager";
import { IProvider } from "../interfaces/IProvider";
export declare class Provider implements IProvider {
    readonly requestManager: IRequestManager;
    readonly responseManager: IResponseManager;
    /**
     * @param requestManager
     * @param responseManager
     */
    constructor(requestManager: IRequestManager, responseManager: IResponseManager);
    set extraConfiguration(configuration: Record<string, any>);
}
