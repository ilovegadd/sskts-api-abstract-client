// tslint:disable:max-classes-per-file
/**
 * API Service Library for Javascript
 */
import * as cinerino from '@cinerino/api-abstract-client';
import * as factory from './factory';

import { AccountService } from './service/account';
import { ActionService } from './service/action';
import { EventService } from './service/event';
import { OrderService } from './service/order';
import { OrganizationService } from './service/organization';
import { OwnershipInfoService } from './service/ownershipInfo';
import { PersonService } from './service/person';
import { PlaceService } from './service/place';
import { ProgramMembershipService } from './service/programMembership';
import { TaskService } from './service/task';
import { PlaceOrderTransactionService } from './service/transaction/placeOrder';
import { ReturnOrderTransactionService } from './service/transaction/returnOrder';
import { UserPoolService } from './service/userPool';

export import factory = factory;
export import transporters = cinerino.transporters;
export import auth = cinerino.auth;

/**
 * 抽象認証クライアント
 */
export abstract class Auth extends cinerino.auth.Auth { }

export namespace service {
    /**
     * Pecorino口座サービス
     */
    export class Account extends AccountService { }
    /**
     * アクションサービス
     */
    export class Action extends ActionService { }
    /**
     * イベントサービス
     */
    export class Event extends EventService { }
    /**
     * 注文サービス
     */
    export class Order extends OrderService { }
    /**
     * 組織サービス
     */
    export class Organization extends OrganizationService { }
    /**
     * 所有権サービス
     */
    export class OwnershipInfo extends OwnershipInfoService { }
    /**
     * ユーザーサービス
     */
    export class Person extends PersonService { }
    /**
     * 場所サービス
     */
    export class Place extends PlaceService { }
    /**
     * 会員プログラムサービス
     */
    export class ProgramMembership extends ProgramMembershipService { }
    /**
     * タスクサービス
     */
    export class Task extends TaskService { }
    export namespace transaction {
        /**
         * 注文取引サービス
         */
        export class PlaceOrder extends PlaceOrderTransactionService { }
        /**
         * 注文返品取引サービス
         */
        export class ReturnOrder extends ReturnOrderTransactionService { }
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
    export class UserPool extends UserPoolService { }
}
