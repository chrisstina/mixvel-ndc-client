import { BookParams } from "../core/request/parameters/Book";

export class FirstAvailableEmailService {
  static getFirstAvailableEmail(params: BookParams): string | undefined {
    for (const passengersKey in params.passengers) {
      if (params.passengers[passengersKey].contacts.email !== undefined) {
        return params.passengers[passengersKey].contacts.email;
      }
    }
  }
}
