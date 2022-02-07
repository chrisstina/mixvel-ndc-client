import {IRequestManager} from "./IRequestManager";
import {MixvelResponseManager} from "../providers/mixvel/MixvelResponseManager";

export interface IProvider {
    extraConfiguration: {};
    readonly requestManager: IRequestManager;
    readonly responseManager: MixvelResponseManager;
}