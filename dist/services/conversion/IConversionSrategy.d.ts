export interface IConversionStrategy {
    execute(payload: Object): string;
}
