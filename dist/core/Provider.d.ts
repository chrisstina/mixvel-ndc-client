import { MixvelResponseManager } from "../mixvel/MixvelResponseManager";
import { IRequestManager } from "../interfaces/IRequestManager";
import { IProvider } from "../interfaces/IProvider";
export declare class Provider implements IProvider {
    readonly requestManager: IRequestManager;
    readonly responseManager: MixvelResponseManager;
    constructor(requestManager: IRequestManager, responseManager: MixvelResponseManager);
}
