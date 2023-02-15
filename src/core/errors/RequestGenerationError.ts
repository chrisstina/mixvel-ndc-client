export class RequestGenerationError extends Error {
  constructor(message: string) {
    super();
    this.name = "RequestGenerationError";
    this.message = `Request could not be generated: ${message}`;
  }
}
