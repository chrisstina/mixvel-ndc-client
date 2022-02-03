import { IRequestManager } from "./IRequestManager";
import { MixvelResponseManager } from "../mixvel/MixvelResponseManager";
export interface IProvider {
    readonly requestManager: IRequestManager;
    readonly responseManager: MixvelResponseManager;
}
