import { Cabin } from "../../../../core/request/types";
/**
 * Возможные значения кода салона:
 *
 * Р – салон премиального первого класса;
 * PADIS 1 или F - салон первого класса;
 * J – салон премиум бизнес-класса;
 * PADIS 2 или С - салон бизнес-класса;
 * PADIS 4 или W - салон премиального эконом-класса;
 * PADIS 5 или Y – салон эконом-класса.
 */
export declare enum SirenaCabin {
    ECONOMY = "Y",
    BUSINESS = "\u0421"
}
export declare function toSirena(cabin: Cabin): SirenaCabin;
