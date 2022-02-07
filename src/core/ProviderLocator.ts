import {IProvider} from "../interfaces/IProvider";

export class ProviderLocator {
    private static providers: Map<string, IProvider> = new Map<string, IProvider>()

    public static get(providerCode: string): IProvider | never {
        const provider = ProviderLocator.providers.get(providerCode)
        if (provider === undefined) {
            throw new Error('No provider found for code' + providerCode)
        }
        return provider
    }

    public static register(providerCode: string, provider: IProvider) {
        ProviderLocator.providers.set(providerCode, provider)
    }
}