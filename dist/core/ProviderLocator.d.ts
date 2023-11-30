import { IProvider } from "../interfaces/IProvider";
export declare class ProviderLocator {
    private static providers;
    static get(providerCode: string): IProvider | never;
    static register(providerCode: string, provider: IProvider): void;
}
