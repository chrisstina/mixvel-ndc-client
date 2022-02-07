"use strict";
/*
 * Copyright (c) 2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelAuthAppData = void 0;
var MixvelAuthAppData = /** @class */ (function () {
    function MixvelAuthAppData(login, password, structureUnitId) {
        this["auth:Auth"] = {
            $: { "xmlns:auth": "https://www.mixvel.com/API/XSD/mixvel_auth/1_01" },
            Login: login,
            Password: password,
            StructureUnitID: structureUnitId
        };
    }
    return MixvelAuthAppData;
}());
exports.MixvelAuthAppData = MixvelAuthAppData;
