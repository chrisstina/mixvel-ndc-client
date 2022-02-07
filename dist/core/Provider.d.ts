import { MixvelResponseManager } from "../providers/mixvel/MixvelResponseManager";
import { IRequestManager } from "../interfaces/IRequestManager";
import { IProvider } from "../interfaces/IProvider";
export declare class Provider implements IProvider {
    readonly requestManager: IRequestManager;
    readonly responseManager: MixvelResponseManager;
    /**
     * @param requestManager
     * @param responseManager
     */
    constructor(requestManager: IRequestManager, responseManager: MixvelResponseManager);
    set extraConfiguration(configuration: {});
}
