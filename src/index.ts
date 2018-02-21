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
import { ReturnOrderTransactionService } from './service/transaction/returnOrder';
import * as transporters from './transporters';

export import factory = factory;
export import transporters = transporters;

/**
 * auth client abstract class
 * 認証クライアント抽象クラス
 * @export
 */
export abstract class Auth extends AuthClient { }

export namespace service {
    /**
     * action service
     */
    export class Action extends ActionService { }
    /**
     * event service
     */
    export class Event extends EventService { }
    /**
     * order service
     */
    export class Order extends OrderService { }
    /**
     * organization service
     */
    export class Organization extends OrganizationService { }
    /**
     * person service
     */
    export class Person extends PersonService { }
    /**
     * place service
     */
    export class Place extends PlaceService { }
    /**
     * event service
     * @param options service configurations
     * @deprecated use new service.Event() instead.
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    export function event(options: IOptions) {
        return new EventService(options);
    }
    /**
     * order service
     * @param options service configurations
     * @deprecated use new service.Order() instead.
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    export function order(options: IOptions) {
        return new OrderService(options);
    }
    /**
     * organization service
     * @param options service configurations
     * @deprecated use new service.Organization() instead.
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    export function organization(options: IOptions) {
        return new OrganizationService(options);
    }
    /**
     * person service
     * @param options service configurations
     * @deprecated use new service.Person() instead.
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    export function person(options: IOptions) {
        return new PersonService(options);
    }
    /**
     * place service
     * @param options service configurations
     * @deprecated use new service.Place() instead.
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    export function place(options: IOptions) {
        return new PlaceService(options);
    }

    export namespace transaction {
        /**
         * 注文取引サービス
         */
        export class PlaceOrder extends PlaceOrderTransactionService { }
        /**
         * 注文返品取引サービス
         */
        export class ReturnOrder extends ReturnOrderTransactionService { }

        /**
         * placeOrder transaction service
         * @param options service configurations
         * @deprecated use new service.transaction.PlaceOrder() instead.
         */
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore next */
        export function placeOrder(options: IOptions) {
            return new PlaceOrderTransactionService(options);
        }
    }
}
