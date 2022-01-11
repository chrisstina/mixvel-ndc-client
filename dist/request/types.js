"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousTraveler = exports.OriginDestination = void 0;
var OriginDestination = /** @class */ (function () {
    function OriginDestination(from, to, dateRangeStart, dateRangeEnd) {
        this.from = from;
        this.to = to;
        this.dateRangeStart = dateRangeStart;
        this.dateRangeEnd = dateRangeEnd;
    }
    return OriginDestination;
}());
exports.OriginDestination = OriginDestination;
var AnonymousTraveler = /** @class */ (function () {
    function AnonymousTraveler(id, ptc, age) {
        this.id = id;
        this.ptc = ptc;
        this.age = age;
    }
    return AnonymousTraveler;
}());
exports.AnonymousTraveler = AnonymousTraveler;
