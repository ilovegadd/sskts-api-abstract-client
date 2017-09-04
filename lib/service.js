"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AuthClient abstract class
 * 抽象認証クライアント
 * @export
 * @abstract
 * @class
 */
var AuthClient = /** @class */ (function () {
    function AuthClient() {
    }
    return AuthClient;
}());
exports.AuthClient = AuthClient;
/**
 * base service class
 * @export
 * @class Service
 */
var Service = /** @class */ (function () {
    function Service(options) {
        this.options = options;
    }
    return Service;
}());
exports.Service = Service;
