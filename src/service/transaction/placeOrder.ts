/**
 * 注文取引サービス
 */
import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { IOptions, Service } from '../../service';

/**
 * 承認アクションインターフェース
 */
export interface IAuthorizeAction {
    id: string;
}

/**
 * 注文取引サービス
 */
export class PlaceOrderTransactionService extends Service {
    public typeOf: factory.transactionType.PlaceOrder = factory.transactionType.PlaceOrder;

    constructor(options: IOptions) {
        super(options)/* istanbul ignore next */;
    }

    /**
     * 取引を開始する
     * 開始できない場合(混雑中など)、nullが返されます。
     */
    public async start(params: {
        /**
         * 取引期限
         * 指定した日時を過ぎると、取引を進行することはできなくなります。
         */
        expires: Date;
        /**
         * 購入者
         */
        agent?: {
            identifier?: factory.person.IIdentifier;
        };
        /**
         * 販売者
         */
        seller?: {
            typeOf: factory.organizationType;
            id: string;
        };
        object?: {
            /**
             * WAITER許可証
             */
            passport?: {
                token: factory.waiter.passport.IEncodedPassport;
            };
        };
    }): Promise<factory.transaction.placeOrder.ITransaction> {
        return this.fetch({
            uri: '/transactions/placeOrder/start',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 取引に座席予約を追加する
     */
    public async createSeatReservationAuthorization(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * イベント識別子
         */
        eventIdentifier: string;
        /**
         * 座席販売情報
         */
        offers: factory.offer.seatReservation.IOffer[];
    }): Promise<factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.id}/actions/authorize/seatReservation`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                eventIdentifier: params.eventIdentifier,
                offers: params.offers
            }
        }).then(async (response) => response.json());
    }

    /**
     * 座席予約取消
     */
    public async cancelSeatReservationAuthorization(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.id}/actions/authorize/seatReservation/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 座席予約承認アクションの供給情報を変更する
     * 完了ステータスの座席仮予約に対して券種変更する際に使用
     */
    public async changeSeatReservationOffers(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * アクションID
         */
        actionId: string;
        /**
         * イベント識別子
         */
        eventIdentifier: string;
        /**
         * 座席販売情報
         */
        offers: factory.offer.seatReservation.IOffer[];
    }): Promise<factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.id}/actions/authorize/seatReservation/${params.actionId}`,
            method: 'PATCH',
            expectedStatusCodes: [OK],
            body: {
                eventIdentifier: params.eventIdentifier,
                offers: params.offers
            }
        }).then(async (response) => response.json());
    }

    /**
     * クレジットカードのオーソリを取得する
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async authorizeCreditCardPayment(params: {
        object: factory.action.authorize.paymentMethod.creditCard.IObject;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.creditCard.IAction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/creditCard`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * 口座決済のオーソリを取得する
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async authorizeAccountPayment<T extends factory.accountType>(params: {
        object: factory.action.authorize.paymentMethod.account.IObject<T>;
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<factory.action.authorize.paymentMethod.account.IAction<T>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/account`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        })
            .then(async (response) => response.json());
    }

    /**
     * 決済承認取消
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async voidPayment(params: {
        /**
         * アクションID
         */
        id: string;
        object: {
            /**
             * 決済方法
             */
            typeOf: factory.paymentMethodType;
        };
        purpose: factory.action.authorize.paymentMethod.any.IPurpose;
    }): Promise<void> {
        await this.fetch({
            // tslint:disable-next-line:max-line-length
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/paymentMethod/${params.object.typeOf}/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 決済方法として、ムビチケを追加する
     */
    public async createMvtkAuthorization(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * ムビチケ情報
         */
        mvtk: factory.action.authorize.discount.mvtk.IObject;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.id}/actions/authorize/mvtk`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.mvtk
        }).then(async (response) => response.json());
    }

    /**
     * ムビチケ取消
     */
    public async cancelMvtkAuthorization(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.id}/actions/authorize/mvtk/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ポイントポイントインセンティブのオーソリを取得する
     */
    public async createPecorinoAwardAuthorization(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * 金額
         */
        amount: number;
        /**
         * 入金先口座番号
         */
        toAccountNumber: string;
        /**
         * 取引メモ
         * 指定すると、口座の取引明細に記録されます。
         * 後の調査のためにある程度の情報を記録することが望ましい。
         */
        notes?: string;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.id}/actions/authorize/award/pecorino`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                amount: params.amount,
                toAccountNumber: params.toAccountNumber,
                notes: params.notes
            }
        }).then(async (response) => response.json());
    }

    /**
     * ポイントポイントインセンティブオーソリ取消
     */
    public async cancelPecorinoAwardAuthorization(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.id}/actions/authorize/award/pecorino/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * register a customer contact
     */
    public async setCustomerContact(params: {
        /**
         * 取引ID
         */
        id: string;
        object?: {
            /**
             * customer contact info
             */
            customerContact: factory.transaction.placeOrder.ICustomerContact;
        };
    }): Promise<factory.transaction.placeOrder.ICustomerContact> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.id}/customerContact`,
            method: 'PUT',
            expectedStatusCodes: [CREATED, OK],
            body: {
                ...(params.object !== undefined) ? params.object.customerContact : /* istanbul ignore next */ {},
                telephoneRegion: 'JP'
            }
        }).then(async (response) => response.json());
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        /**
         * 取引ID
         */
        id: string;
        options?: {
            /**
             * 注文配送メールを送信するかどうか
             */
            sendEmailMessage?: boolean;
            /**
             * 注文配送メールテンプレート
             * メールをカスタマイズしたい場合、PUGテンプレートを指定
             * 挿入変数として`order`を使用できます
             * @see https://pugjs.org/api/getting-started.html
             * @example example/sendOrder.pug
             */
            emailTemplate?: string;
        };
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.id}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                ...params.options
            }
        }).then(async (response) => response.json());
    }

    /**
     * 確定した取引に関して、購入者にメール通知を送信する
     */
    public async sendEmailNotification(params: {
        /**
         * 取引ID
         */
        id: string;
        /**
         * Eメールメッセージ属性
         */
        emailMessageAttributes: factory.creativeWork.message.email.IAttributes;
    }): Promise<factory.task.ITask<factory.taskName.SendEmailMessage>> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.id}/tasks/sendEmailNotification`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.emailMessageAttributes
        }).then(async (response) => response.json());
    }

    /**
     * 明示的に取引を中止する
     * 既に確定済、あるいは、期限切れの取引に対して実行するとNotFoundエラーが返されます。
     */
    public async cancel(params: {
        /**
         * 取引ID
         */
        id: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.id}/cancel`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
