"use strict";
/*
 * Copyright (c) 2021
 */
/**
 * Тело сообщения в формате MixvelNDC, в структуре ответа Mixvel находится в блоке Body[0].AppData
 * @typedef {NDCResponseMessage}
 * @property {{}} $
 * @property {{}[]|undefined} Response
 * @property {{}[]|undefined} Error
 */
module.exports = /** @class */ (function () {
    function NDCResponseMessage(nodeName, responseJSON) {
        try {
            Object.assign(this, responseJSON[nodeName][0]);
        }
        catch (e) {
            console.error(e.stack);
            throw new Error('Could not parse NDC message');
        }
    }
    return NDCResponseMessage;
}());
