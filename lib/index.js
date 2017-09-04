"use strict";
// tslint:disable:max-classes-per-file
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
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./service/event");
var order_1 = require("./service/order");
var organization_1 = require("./service/organization");
var person_1 = require("./service/person");
var place_1 = require("./service/place");
var placeOrder_1 = require("./service/transaction/placeOrder");
var transporters = require("./transporters");
exports.transporters = transporters;
/**
 * event service
 * @class
 */
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Event;
}(event_1.EventService));
exports.Event = Event;
/**
 * order service
 * @class
 */
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Order;
}(order_1.OrderService));
exports.Order = Order;
/**
 * organization service
 * @class
 */
var Organization = /** @class */ (function (_super) {
    __extends(Organization, _super);
    function Organization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Organization;
}(organization_1.OrganizationService));
exports.Organization = Organization;
/**
 * person service
 * @class
 */
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Person;
}(person_1.PersonService));
exports.Person = Person;
/**
 * place service
 * @class
 */
var Place = /** @class */ (function (_super) {
    __extends(Place, _super);
    function Place() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Place;
}(place_1.PlaceService));
exports.Place = Place;
/**
 * event service
 * @param {IOptions} options service configurations
 */
function event(options) {
    return new event_1.EventService(options);
}
exports.event = event;
/**
 * order service
 * @param {IOptions} options service configurations
 */
function order(options) {
    return new order_1.OrderService(options);
}
exports.order = order;
/**
 * organization service
 * @param {IOptions} options service configurations
 */
function organization(options) {
    return new organization_1.OrganizationService(options);
}
exports.organization = organization;
/**
 * person service
 * @param {IOptions} options service configurations
 */
function person(options) {
    return new person_1.PersonService(options);
}
exports.person = person;
/**
 * place service
 * @param {IOptions} options service configurations
 */
function place(options) {
    return new place_1.PlaceService(options);
}
exports.place = place;
var transaction;
(function (transaction) {
    /**
     * placeOrder transaction service
     * @class
     */
    var PlaceOrder = /** @class */ (function (_super) {
        __extends(PlaceOrder, _super);
        function PlaceOrder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PlaceOrder;
    }(placeOrder_1.PlaceOrderTransactionService));
    transaction.PlaceOrder = PlaceOrder;
    /**
     * placeOrder transaction service
     * @param {IOptions} options service configurations
     */
    function placeOrder(options) {
        return new placeOrder_1.PlaceOrderTransactionService(options);
    }
    transaction.placeOrder = placeOrder;
})(transaction = exports.transaction || (exports.transaction = {}));
