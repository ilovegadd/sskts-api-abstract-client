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
export declare abstract class Auth extends AuthClient {
}
export declare namespace service {
    /**
     * action service
     * @class
     */
    class Action extends ActionService {
    }
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
     * @deprecated
     */
    function event(options: IOptions): EventService;
    /**
     * order service
     * @param {IOptions} options service configurations
     * @deprecated
     */
    function order(options: IOptions): OrderService;
    /**
     * organization service
     * @param {IOptions} options service configurations
     * @deprecated
     */
    function organization(options: IOptions): OrganizationService;
    /**
     * person service
     * @param {IOptions} options service configurations
     * @deprecated
     */
    function person(options: IOptions): PersonService;
    /**
     * place service
     * @param {IOptions} options service configurations
     * @deprecated
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
         * @deprecated
         */
        function placeOrder(options: IOptions): PlaceOrderTransactionService;
    }
}
