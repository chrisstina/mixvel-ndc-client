import {DateTime} from "luxon";

export function toTicketMeDate(date: Date) {
    return DateTime.fromJSDate(date).toISODate()
}

export function genderToTitle(gender: "M" | "F"): "Mr" | "Mrs" {
    if (gender === "F") {
        return "Mrs"
    }
    return "Mr"
}