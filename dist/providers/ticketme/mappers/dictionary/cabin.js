"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTicketMe = exports.TicketMeCabin = void 0;
/**
 * Список возможных значений Code для элемента CabinType
 Значение Описание
 1 Первый класс
 2 Бизнес класс
 3 Любой экономический класс
 4 Премиум экономический класс
 5 Экономический класс
 6 Экономический класс со скидкрй
 7 Любой класс
 */
var TicketMeCabin;
(function (TicketMeCabin) {
    TicketMeCabin["ECONOMY"] = "3";
    TicketMeCabin["BUSINESS"] = "2";
    TicketMeCabin["ANY"] = "7";
})(TicketMeCabin = exports.TicketMeCabin || (exports.TicketMeCabin = {}));
function toTicketMe(cabin) {
    return TicketMeCabin[cabin] || TicketMeCabin.ANY;
}
exports.toTicketMe = toTicketMe;
