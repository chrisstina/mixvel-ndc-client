import { Cabin } from "../../../../request/types";
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
export declare enum TicketMeCabin {
    ECONOMY = "3",
    BUSINESS = "2",
    ANY = "7"
}
export declare function toTicketMe(cabin: Cabin): TicketMeCabin;
