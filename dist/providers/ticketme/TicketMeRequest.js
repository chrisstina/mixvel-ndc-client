"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMeRequest = void 0;
var TicketMeRequest = /** @class */ (function () {
    function TicketMeRequest(message, options, conversionStrategy) {
        this.message = message;
        this.options = options;
        this.conversionStrategy = conversionStrategy;
        this.options = options;
    }
    Object.defineProperty(TicketMeRequest.prototype, "body", {
        get: function () {
            if (!this.conversionStrategy) {
                console.debug('No request body output converter found! Return as is');
                return this.message;
            }
            var obj = {};
            obj[this.message.nodeName] = this.message;
            return this.conversionStrategy.execute(obj);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TicketMeRequest.prototype, "headers", {
        get: function () {
            return this.options.headers;
        },
        enumerable: false,
        configurable: true
    });
    TicketMeRequest.prototype.addHeader = function (name, contents) {
        if (this.options.headers == undefined) {
            this.options.headers = {};
        }
        this.options.headers[name] = contents;
    };
    return TicketMeRequest;
}());
exports.TicketMeRequest = TicketMeRequest;
