export interface IConversionStrategy {
    execute(payload: Object): string | Object | Promise<Object | null>;
}
