"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SirenaRequest = void 0;
var SirenaRequest = /** @class */ (function () {
    function SirenaRequest(message, options, conversionStrategy) {
        this.message = message;
        this.options = options;
        this.conversionStrategy = conversionStrategy;
        this.options = options;
    }
    Object.defineProperty(SirenaRequest.prototype, "body", {
        get: function () {
            if (!this.conversionStrategy) {
                console.debug("No request body output converter found! Return as is");
                return this.message;
            }
            var obj = {};
            obj[this.message.nodeName] = this.message;
            return this.conversionStrategy.execute(obj);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SirenaRequest.prototype, "headers", {
        get: function () {
            return this.options.headers;
        },
        enumerable: false,
        configurable: true
    });
    SirenaRequest.prototype.addHeader = function (name, contents) {
        if (this.options.headers == undefined) {
            this.options.headers = {};
        }
        this.options.headers[name] = contents;
    };
    return SirenaRequest;
}());
exports.SirenaRequest = SirenaRequest;
