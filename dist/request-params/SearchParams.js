"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchParams = void 0;
var OriginDestination = /** @class */ (function () {
    function OriginDestination(from, to, dateRangeStart, dateRangeEnd) {
        this.from = from;
        this.to = to;
        this.dateRangeStart = dateRangeStart;
        this.dateRangeEnd = dateRangeEnd;
    }
    return OriginDestination;
}());
var AnonymousTraveler = /** @class */ (function () {
    function AnonymousTraveler(id, ptc, age) {
        this.id = id;
        this.ptc = ptc;
        this.age = age;
    }
    return AnonymousTraveler;
}());
var SearchParams = /** @class */ (function () {
    function SearchParams(originDestinations, travelers, cabin, preferredCarriers) {
        if (preferredCarriers === void 0) { preferredCarriers = null; }
        this.originDestinations = originDestinations;
        this.travelers = travelers;
        this.cabin = cabin;
        this.preferredCarriers = preferredCarriers;
    }
    return SearchParams;
}());
exports.SearchParams = SearchParams;
