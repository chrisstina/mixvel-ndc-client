import {DateTime} from "luxon";

export function toMixvelDate(date: Date) {
    return DateTime.fromJSDate(date).toISODate()
}

export function toAge(date: Date): string {
    return Math.abs(DateTime.fromJSDate(date).diffNow("years").years).toFixed(0)
}