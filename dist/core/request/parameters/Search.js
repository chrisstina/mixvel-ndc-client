"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchParams = exports.OriginDestination = void 0;
var class_validator_1 = require("class-validator");
var AbstractRequestParams_1 = require("./AbstractRequestParams");
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
var SearchParams = /** @class */ (function (_super) {
    __extends(SearchParams, _super);
    function SearchParams(props) {
        var _this = _super.call(this) || this;
        _this.onlyDirect = false;
        _this.originDestinations = props.originDestinations.map(function (_a) {
            var from = _a.from, to = _a.to, dateRangeEnd = _a.dateRangeEnd, dateRangeStart = _a.dateRangeStart;
            return new OriginDestination(from, to, dateRangeStart, dateRangeEnd);
        });
        _this.travelers = props.travelers.map(function (_a) {
            var id = _a.id, ptc = _a.ptc, age = _a.age;
            return new AnonymousTraveler(id, ptc, age);
        });
        _this.cabin = props.cabin;
        _this.preferredCarriers = props.preferredCarriers;
        if (props.onlyDirect) {
            _this.onlyDirect = props.onlyDirect;
        }
        if (props.pricingOption) {
            _this.pricingOption = props.pricingOption;
        }
        if (props.contract3D) {
            _this.contract3D = props.contract3D;
        }
        if (props.preferredRBD) {
            _this.preferredRBD = props.preferredRBD;
        }
        return _this;
    }
    __decorate([
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ValidateNested)({ each: true })
    ], SearchParams.prototype, "originDestinations", void 0);
    __decorate([
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.ValidateNested)({ each: true })
    ], SearchParams.prototype, "travelers", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ArrayNotEmpty)()
    ], SearchParams.prototype, "preferredCarriers", void 0);
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)()
    ], SearchParams.prototype, "onlyDirect", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsIn)(['LOWEST_FARE', 'ALL_FARES'])
    ], SearchParams.prototype, "pricingOption", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)()
    ], SearchParams.prototype, "contract3D", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)()
    ], SearchParams.prototype, "preferredRBD", void 0);
    return SearchParams;
}(AbstractRequestParams_1.AbstractRequestParams));
exports.SearchParams = SearchParams;
