"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchParams = exports.OriginDestination = void 0;
var class_validator_1 = require("class-validator");
var Result_1 = require("../../core/Result");
var RequestValidationService_1 = require("../../services/RequestValidationService");
var validationService = new RequestValidationService_1.RequestValidationService();
var OriginDestination = /** @class */ (function () {
    function OriginDestination(from, to, dateRangeStart, dateRangeEnd) {
        this.from = from;
        this.to = to;
        this.dateRangeStart = dateRangeStart;
        this.dateRangeEnd = dateRangeEnd;
    }
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.Length)(3, 3)
    ], OriginDestination.prototype, "from", void 0);
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.Length)(3, 3)
    ], OriginDestination.prototype, "to", void 0);
    __decorate([
        (0, class_validator_1.MinDate)(new Date())
    ], OriginDestination.prototype, "dateRangeStart", void 0);
    __decorate([
        (0, class_validator_1.MinDate)(new Date())
    ], OriginDestination.prototype, "dateRangeEnd", void 0);
    return OriginDestination;
}());
exports.OriginDestination = OriginDestination;
var AnonymousTraveler = /** @class */ (function () {
    function AnonymousTraveler(id, ptc, age) {
        this.id = id;
        this.ptc = ptc;
        this.age = age;
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], AnonymousTraveler.prototype, "id", void 0);
    __decorate([
        (0, class_validator_1.IsIn)(["ADULT", "CHILD", "INFANT", "WSEATINFANT", "YOUTH", "SENIOR", "DISABLED", "DISABLEDCHILD", "ESCORT", "LARGEFAMILY", "STATERESIDENT"])
    ], AnonymousTraveler.prototype, "ptc", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(100)
    ], AnonymousTraveler.prototype, "age", void 0);
    return AnonymousTraveler;
}());
var SearchParams = /** @class */ (function () {
    function SearchParams(props) {
        this.originDestinations = props.originDestinations.map(function (_a) {
            var from = _a.from, to = _a.to, dateRangeEnd = _a.dateRangeEnd, dateRangeStart = _a.dateRangeStart;
            return new OriginDestination(from, to, dateRangeStart, dateRangeEnd);
        });
        this.travelers = props.travelers.map(function (_a) {
            var id = _a.id, ptc = _a.ptc, age = _a.age;
            return new AnonymousTraveler(id, ptc, age);
        });
        this.cabin = props.cabin;
        this.preferredCarriers = props.preferredCarriers;
    }
    SearchParams.create = function (props) {
        var params = new SearchParams(props);
        var validationErrors = validationService.getValidator().validate(params);
        if (validationErrors.length > 0) {
            return Result_1.Result.fail(validationService.collectValidationErrors(validationErrors).join(', '));
        }
        return Result_1.Result.ok(params);
    };
    __decorate([
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ValidateNested)({ each: true })
    ], SearchParams.prototype, "originDestinations", void 0);
    __decorate([
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ValidateNested)({ each: true })
    ], SearchParams.prototype, "travelers", void 0);
    return SearchParams;
}());
exports.SearchParams = SearchParams;
