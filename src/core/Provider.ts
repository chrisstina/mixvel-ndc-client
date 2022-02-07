import {MixvelResponseManager} from "../providers/mixvel/MixvelResponseManager";
import {IRequestManager} from "../interfaces/IRequestManager";
import {IProvider} from "../interfaces/IProvider";

export class Provider implements IProvider {
    /**
     * @param requestManager
     * @param responseManager
     */
    constructor(public readonly requestManager: IRequestManager,
                public readonly responseManager: MixvelResponseManager) {
    }

    set extraConfiguration(configuration: {}) {
        this.requestManager.extraConfiguration = configuration
        // this.responseManager.extraConfiguration = configuration
    }
}