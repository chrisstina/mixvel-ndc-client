import {MixvelResponseManager} from "../providers/mixvel/MixvelResponseManager";
import {IRequestManager} from "../interfaces/IRequestManager";
import {IProvider} from "../interfaces/IProvider";

export class Provider implements IProvider {
    constructor(readonly requestManager: IRequestManager,
                readonly responseManager: MixvelResponseManager) {
    }
}