/*
 * Copyright (c) 2021
 */

export class MixvelAuthAppData {
    public "auth:Auth": {}

    constructor(login: string, password: string, structureUnitId: string) {
        this["auth:Auth"] = {
            $: {},
            Login: login,
            Password: password,
            StructureUnitID: structureUnitId
        }
    }
}