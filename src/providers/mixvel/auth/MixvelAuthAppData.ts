/*
 * Copyright (c) 2021
 */

export class MixvelAuthAppData {
  public "auth:Auth": Record<string, unknown>;

  constructor(login: string, password: string, structureUnitId: string) {
    this["auth:Auth"] = {
      $: { "xmlns:auth": "https://www.mixvel.com/API/XSD/mixvel_auth/1_01" },
      Login: login,
      Password: password,
      StructureUnitID: structureUnitId,
    };
  }
}
