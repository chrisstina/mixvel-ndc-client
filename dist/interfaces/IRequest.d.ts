export interface IRequest {
    options: {
        [p: string]: any;
    };
    readonly body: any;
    readonly headers: {
        [p: string]: string;
    };
    addHeader(name: string, contents: string): void;
}
