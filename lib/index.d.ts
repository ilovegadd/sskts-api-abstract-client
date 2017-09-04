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
export declare class Event extends EventService {
}
/**
 * order service
 * @class
 */
export declare class Order extends OrderService {
}
/**
 * organization service
 * @class
 */
export declare class Organization extends OrganizationService {
}
/**
 * person service
 * @class
 */
export declare class Person extends PersonService {
}
/**
 * place service
 * @class
 */
export declare class Place extends PlaceService {
}
/**
 * event service
 * @param {IOptions} options service configurations
 */
export declare function event(options: IOptions): EventService;
/**
 * order service
 * @param {IOptions} options service configurations
 */
export declare function order(options: IOptions): OrderService;
/**
 * organization service
 * @param {IOptions} options service configurations
 */
export declare function organization(options: IOptions): OrganizationService;
/**
 * person service
 * @param {IOptions} options service configurations
 */
export declare function person(options: IOptions): PersonService;
/**
 * place service
 * @param {IOptions} options service configurations
 */
export declare function place(options: IOptions): PlaceService;
export declare namespace transaction {
    /**
     * placeOrder transaction service
     * @class
     */
    class PlaceOrder extends PlaceOrderTransactionService {
    }
    /**
     * placeOrder transaction service
     * @param {IOptions} options service configurations
     */
    function placeOrder(options: IOptions): PlaceOrderTransactionService;
}
