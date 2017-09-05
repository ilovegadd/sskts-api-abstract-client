/**
 * Sasaki API Service Library for Javascript
 * @ignore
 */
import * as factory from '@motionpicture/sskts-factory';
import { AuthClient } from './auth/authClient';
import { IOptions } from './service';
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
export declare abstract class Auth extends AuthClient {
}
export declare namespace service {
    /**
     * event service
     * @class
     */
    class Event extends EventService {
    }
    /**
     * order service
     * @class
     */
    class Order extends OrderService {
    }
    /**
     * organization service
     * @class
     */
    class Organization extends OrganizationService {
    }
    /**
     * person service
     * @class
     */
    class Person extends PersonService {
    }
    /**
     * place service
     * @class
     */
    class Place extends PlaceService {
    }
    /**
     * event service
     * @param {IOptions} options service configurations
     */
    function event(options: IOptions): EventService;
    /**
     * order service
     * @param {IOptions} options service configurations
     */
    function order(options: IOptions): OrderService;
    /**
     * organization service
     * @param {IOptions} options service configurations
     */
    function organization(options: IOptions): OrganizationService;
    /**
     * person service
     * @param {IOptions} options service configurations
     */
    function person(options: IOptions): PersonService;
    /**
     * place service
     * @param {IOptions} options service configurations
     */
    function place(options: IOptions): PlaceService;
    namespace transaction {
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
}
