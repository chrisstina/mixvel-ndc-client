import {IRequestManager} from "../interfaces/IRequestManager";
import {IResponseManager} from "../interfaces/IResponseManager";
import {IProvider} from "../interfaces/IProvider";

export class Provider implements IProvider {
  /**
   * @param requestManager
   * @param responseManager
   */
  constructor(
    public readonly requestManager: IRequestManager,
    public readonly responseManager: IResponseManager
  ) {}

  set extraConfiguration(configuration: Record<string, any>) {
    this.requestManager.extraConfiguration = configuration;
    // this.responseManager.extraConfiguration = configuration
  }
}
