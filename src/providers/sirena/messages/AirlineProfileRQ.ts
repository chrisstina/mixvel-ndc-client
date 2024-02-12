/*
 * Copyright (c) 2023
 */
import { StringValue } from "../../../core/request/types";
import { AbstractSirenaNDCMessage } from "./AbstractSirenaNDCMessage";

/**
 * Объекты этого класса будут конвертироваться в XML, поэтому в полях можно держать только то, что уйдет в итоговый запрос.
 * Остальное можно реализовать геттерами.
 */
export class AirlineProfileRQ extends AbstractSirenaNDCMessage {
  public Query: {
    ProfileOwner: StringValue[];
  };

  constructor(airline: string) {
    super();
    this.Query = { ProfileOwner: [{ _: airline }] };
  }

  get nodeName() {
    return "AirlineProfileRQ";
  }
}
