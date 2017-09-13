// tslint:disable:max-classes-per-file

/**
 * Sasaki API Service Library for Javascript
 * @ignore
 */

import * as factory from '@motionpicture/sskts-factory';

import { AuthClient } from './auth/authClient';

import { IOptions } from './service';
import { ActionService } from './service/action';
import { EventService } from './service/event';
import { OrderService } from './service/order';
import { OrganizationService } from './service/organization';
import { PersonService } from './service/person';
import { PlaceService } from './service/place';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * auth client abstract class
 * 認証クライアント抽象クラス
 * @export
 * @class
 * @abstract
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * action service
     * @class
     */
    export class Action extends ActionService { }
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
     * @deprecated
     */
    export function event(options: IOptions) {
        return new EventService(options);
    }
    /**
     * order service
     * @param {IOptions} options service configurations
     * @deprecated
     */
    export function order(options: IOptions) {
        return new OrderService(options);
    }
    /**
     * organization service
     * @param {IOptions} options service configurations
     * @deprecated
     */
    export function organization(options: IOptions) {
        return new OrganizationService(options);
    }
    /**
     * person service
     * @param {IOptions} options service configurations
     * @deprecated
     */
    export function person(options: IOptions) {
        return new PersonService(options);
    }
    /**
     * place service
     * @param {IOptions} options service configurations
     * @deprecated
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
         * @deprecated
         */
        export function placeOrder(options: IOptions) {
            return new PlaceOrderTransactionService(options);
        }
    }
}
