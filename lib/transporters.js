"use strict";
/**
 * transporters
 * @ignore
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var createDebug = require("debug");
var httpStatus = require("http-status");
var fetch = require("isomorphic-fetch");
var debug = createDebug('sasaki-api-service:transporters');
// tslint:disable-next-line
var pkg = require('../package.json');
/**
 * RequestError
 * @export
 * @class
 */
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    function RequestError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequestError;
}(Error));
exports.RequestError = RequestError;
/**
 * DefaultTransporter
 * @export
 * @class
 */
var DefaultTransporter = /** @class */ (function () {
    function DefaultTransporter(expectedStatusCodes) {
        this.expectedStatusCodes = expectedStatusCodes;
    }
    /**
     * Configures request options before making a request.
     */
    DefaultTransporter.CONFIGURE = function (options) {
        // set transporter user agent
        options.headers = (options.headers !== undefined) ? options.headers : {};
        if (!options.headers['User-Agent']) {
            options.headers['User-Agent'] = DefaultTransporter.USER_AGENT;
        }
        else if (options.headers['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) === -1) {
            options.headers['User-Agent'] = options.headers['User-Agent'] + " " + DefaultTransporter.USER_AGENT;
        }
        return options;
    };
    /**
     * Makes a request with given options and invokes callback.
     */
    DefaultTransporter.prototype.fetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var fetchOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fetchOptions = DefaultTransporter.CONFIGURE(options);
                        debug('fetching...', fetchOptions);
                        return [4 /*yield*/, fetch(url, fetchOptions).then(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, this.wrapCallback(response)];
                            }); }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Wraps the response callback.
     */
    DefaultTransporter.prototype.wrapCallback = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var err, body, error_1, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        err = new RequestError('An unexpected error occurred');
                        debug('request processed', response.status);
                        if (!(this.expectedStatusCodes.indexOf(response.status) < 0)) return [3 /*break*/, 6];
                        body = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, response.json()];
                    case 2:
                        // Only and only application/json responses should
                        // be decoded back to JSON, but there are cases API back-ends
                        // responds without proper content-type.
                        body = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 4:
                        body = _a.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        if (typeof body === 'object' && body.error !== undefined) {
                            err = new RequestError(body.error.message);
                            err.code = response.status;
                            err.errors = body.error.errors;
                        }
                        else {
                            err = new RequestError(body);
                            err.code = response.status;
                            err.errors = [];
                        }
                        return [3 /*break*/, 9];
                    case 6:
                        if (!(response.status === httpStatus.NO_CONTENT)) return [3 /*break*/, 7];
                        // consider 204
                        return [2 /*return*/];
                    case 7: return [4 /*yield*/, response.json()];
                    case 8:
                        body = _a.sent();
                        if (body !== undefined) {
                            // consider 200,201,404
                            return [2 /*return*/, body];
                        }
                        _a.label = 9;
                    case 9: throw err;
                }
            });
        });
    };
    /**
     * Default user agent.
     */
    DefaultTransporter.USER_AGENT = "sasaki-api-javascript-client/" + pkg.version;
    return DefaultTransporter;
}());
exports.DefaultTransporter = DefaultTransporter;
/**
 * TransporterWithRequestPromise
 */
// export class TransporterWithRequestPromise {
//     /**
//      * Default user agent.
//      */
//     public static readonly USER_AGENT: string = `sasaki-api-nodejs-client/${pkg.version}`;
//     public expectedStatusCodes: number[];
//     constructor(expectedStatusCodes: number[]) {
//         this.expectedStatusCodes = expectedStatusCodes;
//     }
//     /**
//      * Configures request options before making a request.
//      */
//     public static CONFIGURE(options: request.OptionsWithUri): request.OptionsWithUri {
//         // set transporter user agent
//         options.headers = (options.headers !== undefined) ? options.headers : {};
//         if (!options.headers['User-Agent']) {
//             options.headers['User-Agent'] = DefaultTransporter.USER_AGENT;
//         } else if (options.headers['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) === -1) {
//             options.headers['User-Agent'] = `${options.headers['User-Agent']} ${DefaultTransporter.USER_AGENT}`;
//         }
//         return options;
//     }
//     /**
//      * Makes a request with given options and invokes callback.
//      */
//     public async request(options: request.OptionsWithUri) {
//         const requestOptions = DefaultTransporter.CONFIGURE(options);
//         return await request(requestOptions)
//             .then((res) => this.wrapCallback(res));
//     }
//     /**
//      * Wraps the response callback.
//      */
//     private wrapCallback(res: request.FullResponse): any {
//         let err: RequestError = new RequestError('An unexpected error occurred');
//         debug('request processed', res.statusCode, res.body);
//         if (res.statusCode !== undefined) {
//             if (this.expectedStatusCodes.indexOf(res.statusCode) < 0) {
//                 if (typeof res.body === 'string') {
//                     // Consider all 4xx and 5xx responses errors.
//                     err = new RequestError(res.body);
//                     err.code = res.statusCode;
//                 }
//                 if (typeof res.body === 'object' && res.body.errors !== undefined) {
//                     // consider 400
//                     err = new RequestError((<any[]>res.body.errors).map((error) => `${error.title}:${error.detail}`).join('\n'));
//                     err.code = res.statusCode;
//                     err.errors = res.body.errors;
//                 }
//             } else {
//                 if (res.body !== undefined) {
//                     // consider 200,201,404
//                     return res.body;
//                 } else {
//                     // consider 204
//                     return;
//                 }
//             }
//         }
//         throw err;
//     }
// }
