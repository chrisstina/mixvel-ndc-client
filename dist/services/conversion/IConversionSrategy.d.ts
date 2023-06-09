export interface IConversionStrategy {
    execute(payload: unknown): string | Record<string, unknown> | Promise<Record<string, unknown> | null>;
}
