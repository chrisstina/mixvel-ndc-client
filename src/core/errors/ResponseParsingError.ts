export default class ResponseParsingError extends Error {
  constructor(message: string) {
    super();
    this.name = "ResponseParsingError";
    this.message = `Response could not be parsed: ${message}`;
  }
}
