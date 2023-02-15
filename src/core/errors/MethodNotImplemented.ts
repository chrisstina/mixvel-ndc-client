export class MethodNotImplemented extends Error {
  constructor(message: string) {
    super();
    this.name = "MethodNotImplemented";
    this.message = `Method ${message} not implemented for this provider`;
  }
}
