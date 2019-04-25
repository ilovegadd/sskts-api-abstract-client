// tslint:disable:max-classes-per-file
/**
 * API Service Library for Javascript
 */
import * as cinerino from '@cinerino/api-abstract-client';

import { AccountService } from './service/account';
import { ActionService } from './service/action';
import { OrderService } from './service/order';
import { OwnershipInfoService } from './service/ownershipInfo';
import { PersonService } from './service/person';
import { ProgramMembershipService } from './service/programMembership';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';

export import factory = cinerino.factory;
export import transporters = cinerino.transporters;
export import auth = cinerino.auth;

/**
 * 抽象認証クライアント
 */
export abstract class Auth extends cinerino.auth.Auth { }

export namespace service {
    /**
     * 口座サービス
     */
    export class Account extends AccountService { }
    /**
     * アクションサービス
     */
    export class Action extends ActionService { }
    /**
     * イベントサービス
     */
    export class Event extends cinerino.service.Event { }
    /**
     * 注文サービス
     */
    export class Order extends OrderService { }
    /**
     * 所有権サービス
     */
    export class OwnershipInfo extends OwnershipInfoService { }
    export import person = cinerino.service.person;
    /**
     * ユーザーサービス
     */
    export class Person extends PersonService { }
    /**
     * 会員プログラムサービス
     */
    export class ProgramMembership extends ProgramMembershipService { }
    /**
     * 販売者サービス
     */
    export class Seller extends cinerino.service.Seller { }
    /**
     * タスクサービス
     */
    export class Task extends cinerino.service.Task { }
    export namespace transaction {
        /**
         * 注文取引サービス
         */
        export class PlaceOrder extends PlaceOrderTransactionService { }
        /**
         * 注文返品取引サービス
         */
        export class ReturnOrder extends cinerino.service.transaction.ReturnOrder { }
    }
    /**
     * 取引サービス
     * @alias service.transaction
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    export import txn = transaction;
    /**
     * ユーザープールサービス
     */
    export class UserPool extends cinerino.service.UserPool { }
}
