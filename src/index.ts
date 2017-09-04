// tslint:disable:max-classes-per-file

/**
 * Sasaki API Service Library for Javascript
 * @ignore
 */

import { IOptions } from './service';
import { EventService } from './service/event';
import { OrderService } from './service/order';
import { OrganizationService } from './service/organization';
import { PersonService } from './service/person';
import { PlaceService } from './service/place';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import * as transporters from './transporters';

export import transporters = transporters;

/**
 * event service
 * @class
 */
export class Event extends EventService { }
/**
 * order service
 * @class
 */
export class Order extends OrderService { }
/**
 * organization service
 * @class
 */
export class Organization extends OrganizationService { }
/**
 * person service
 * @class
 */
export class Person extends PersonService { }
/**
 * place service
 * @class
 */
export class Place extends PlaceService { }
/**
 * event service
 * @param {IOptions} options service configurations
 */
export function event(options: IOptions) {
    return new EventService(options);
}
/**
 * order service
 * @param {IOptions} options service configurations
 */
export function order(options: IOptions) {
    return new OrderService(options);
}
/**
 * organization service
 * @param {IOptions} options service configurations
 */
export function organization(options: IOptions) {
    return new OrganizationService(options);
}
/**
 * person service
 * @param {IOptions} options service configurations
 */
export function person(options: IOptions) {
    return new PersonService(options);
}
/**
 * place service
 * @param {IOptions} options service configurations
 */
export function place(options: IOptions) {
    return new PlaceService(options);
}

export namespace transaction {
    /**
     * placeOrder transaction service
     * @class
     */
    export class PlaceOrder extends PlaceOrderTransactionService { }
    /**
     * placeOrder transaction service
     * @param {IOptions} options service configurations
     */
    export function placeOrder(options: IOptions) {
        return new PlaceOrderTransactionService(options);
    }
}
