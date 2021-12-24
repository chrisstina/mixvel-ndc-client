export = NDCResponseMessage;
declare class NDCResponseMessage {
    constructor(nodeName: any, responseJSON: any);
}
declare namespace NDCResponseMessage {
    export { exports };
}
/**
 * Тело сообщения в формате MixvelNDC, в структуре ответа Mixvel находится в блоке Body[0].AppData
 */
type exports = NDCResponseMessage;
