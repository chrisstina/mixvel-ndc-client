export interface IRequestOptionsManager {
  create(params: {
    endpoint: string;
    method?: "GET" | "POST";
    headers?: { [p: string]: any };
  }): IRequestOptions;
}

export interface IRequestOptions {
  endpoint: string;
  method?: "GET" | "POST";
  headers?: { [p: string]: any };
}
