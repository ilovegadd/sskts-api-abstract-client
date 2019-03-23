import { factory } from '@cinerino/api-abstract-client';
import { CREATED, NO_CONTENT, OK } from 'http-status';

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
     * 取引開始
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
            uri: `/transactions/${this.typeOf}/start`,
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 座席予約オファー承認
     */
    public async createSeatReservationAuthorization(params: {
        object: {
            /**
             * イベント
             */
            event: { id: string };
            /**
             * オファー
             */
            acceptedOffer: factory.offer.seatReservation.IOffer[];
        };
        purpose: factory.action.authorize.offer.seatReservation.IPurpose;
    }): Promise<factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/seatReservation`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                eventIdentifier: params.object.event.id,
                offers: params.object.acceptedOffer
            }
        }).then(async (response) => response.json());
    }

    /**
     * 座席予約オファー承認取消
     */
    public async cancelSeatReservationAuthorization(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.offer.seatReservation.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/seatReservation/${params.id}`,
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
         * アクションID
         */
        id: string;
        object: {
            /**
             * イベント
             */
            event: { id: string };
            /**
             * オファー
             */
            acceptedOffer: factory.offer.seatReservation.IOffer[];
        };
        purpose: factory.action.authorize.offer.seatReservation.IPurpose;
    }): Promise<factory.action.authorize.offer.seatReservation.IAction<factory.service.webAPI.Identifier.COA>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/seatReservation/${params.id}`,
            method: 'PATCH',
            expectedStatusCodes: [OK],
            body: {
                eventIdentifier: params.object.event.id,
                offers: params.object.acceptedOffer
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
            uri: `/payment/${factory.paymentMethodType.CreditCard}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
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
            uri: `/payment/${factory.paymentMethodType.Account}/authorize`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params
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
            uri: `/payment/${params.object.typeOf}/authorize/${params.id}/void`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT],
            body: params
        });
    }

    /**
     * ムビチケ決済承認
     */
    public async createMvtkAuthorization(params: {
        object: factory.action.authorize.discount.mvtk.IObject;
        purpose: factory.action.authorize.discount.mvtk.IPurpose;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/mvtk`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.object
        }).then(async (response) => response.json());
    }

    /**
     * ムビチケ決済承認取消
     */
    public async cancelMvtkAuthorization(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.discount.mvtk.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/mvtk/${params.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ポイントインセンティブ承認
     */
    public async createPecorinoAwardAuthorization(params: {
        object: {
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
        };
        purpose: factory.action.authorize.award.point.IPurpose;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/award/pecorino`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                amount: params.object.amount,
                toAccountNumber: params.object.toAccountNumber,
                notes: params.object.notes
            }
        }).then(async (response) => response.json());
    }

    /**
     * ポイントインセンティブ承認取消
     */
    public async cancelPecorinoAwardAuthorization(params: {
        /**
         * アクションID
         */
        id: string;
        purpose: factory.action.authorize.award.point.IPurpose;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/${this.typeOf}/${params.purpose.id}/actions/authorize/award/pecorino/${params.id}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 購入者連絡先登録
     */
    public async setCustomerContact(params: {
        /**
         * 取引ID
         */
        id: string;
        object: {
            /**
             * customer contact info
             */
            customerContact: factory.transaction.placeOrder.ICustomerContact;
        };
    }): Promise<factory.transaction.placeOrder.ICustomerContact> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/customerContact`,
            method: 'PUT',
            expectedStatusCodes: [CREATED, OK],
            body: params.object.customerContact
        })
            .then(async (response) => response.json());
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
            uri: `/transactions/${this.typeOf}/${params.id}/confirm`,
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
            uri: `/transactions/${this.typeOf}/${params.id}/tasks/sendEmailNotification`,
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
            uri: `/transactions/${this.typeOf}/${params.id}/cancel`,
            method: 'PUT',
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
