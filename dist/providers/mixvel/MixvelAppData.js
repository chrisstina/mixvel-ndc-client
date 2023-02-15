"use strict";
/*
 * Copyright (c) 2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixvelAppData = void 0;
var MixvelAppData = /** @class */ (function () {
    function MixvelAppData(rq) {
        this[rq.nodeName] = [];
        this[rq.nodeName].push({
            $: rq.xmlns,
            Request: [rq],
        });
    }
    return MixvelAppData;
}());
exports.MixvelAppData = MixvelAppData;
