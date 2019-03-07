/**
 * 注文取引サービス
 */
import { CREATED, NO_CONTENT, OK } from 'http-status';

import * as factory from '../../factory';
import { IOptions, ISearchResult, Service } from '../../service';

/**
 * クレジットカード承認アクションに必要なクレジットカード情報インターフェース
 */
export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw |
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized |
    factory.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;

/**
 * 承認アクションインターフェース
 */
export interface IAuthorizeAction {
    id: string;
}

/**
 * 注文インセンティブインターフェース
 */
export interface IIncentive {
    /**
     * 付与ポイント数
     */
    amount: number;
    /**
     * 付与先口座番号
     */
    toAccountNumber: string;
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
         * 販売者ID
         */
        sellerId: string;
        /**
         * WAITER許可証トークン
         * 指定しなければ、バックエンドで許可証を発行しにいく
         */
        passportToken?: string;
    }): Promise<factory.transaction.placeOrder.ITransaction> {
        return this.fetch({
            uri: '/transactions/placeOrder/start',
            method: 'POST',
            body: {
                expires: params.expires,
                sellerId: params.sellerId,
                seller: { // Cinerino移行のため
                    typeOf: factory.organizationType.MovieTheater,
                    id: params.sellerId
                },
                passportToken: params.passportToken,
                object: { // Cinerino移行のため
                    passport: { token: params.passportToken }
                }
            },
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
        transactionId: string;
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/seatReservation`,
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
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/seatReservation/${params.actionId}`,
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
        transactionId: string;
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/seatReservation/${params.actionId}`,
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
    public async createCreditCardAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * オーダーID
         */
        orderId: string;
        /**
         * 金額
         */
        amount: number;
        /**
         * 支払い方法
         */
        method: string;
        /**
         * クレジットカード情報
         */
        creditCard: ICreditCard;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/creditCard`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                orderId: params.orderId,
                amount: params.amount,
                method: params.method,
                creditCard: params.creditCard
            }
        }).then(async (response) => response.json());
    }

    /**
     * クレジットカードオーソリ取消
     */
    public async cancelCreditCardAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/creditCard/${params.actionId}`,
            method: 'DELETE',
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
        transactionId: string;
        /**
         * ムビチケ情報
         */
        mvtk: factory.action.authorize.discount.mvtk.IObject;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/mvtk`,
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
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/mvtk/${params.actionId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * ポイント口座決済のオーソリを取得する
     */
    public async createPecorinoPaymentAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * 金額
         */
        amount: number;
        /**
         * 引き出し元口座番号
         */
        fromAccountNumber: string;
        /**
         * 取引メモ
         * 指定すると、口座の取引明細に記録されます。
         * 後の調査のためにある程度の情報を記録することが望ましい。
         */
        notes?: string;
    }): Promise<IAuthorizeAction> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/pecorino`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                amount: params.amount,
                fromAccountNumber: params.fromAccountNumber,
                notes: params.notes
            }
        }).then(async (response) => response.json());
    }

    /**
     * ポイント口座決済オーソリ取消
     */
    public async cancelPecorinoPaymentAuthorization(params: {
        /**
         * 取引ID
         */
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/paymentMethod/pecorino/${params.actionId}`,
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
        transactionId: string;
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
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/award/pecorino`,
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
        transactionId: string;
        /**
         * アクションID
         */
        actionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/actions/authorize/award/pecorino/${params.actionId}`,
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
        transactionId: string;
        /**
         * customer contact info
         */
        contact: factory.transaction.placeOrder.ICustomerContact;
    }): Promise<factory.transaction.placeOrder.ICustomerContact> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/customerContact`,
            method: 'PUT',
            expectedStatusCodes: [CREATED, OK],
            body: {
                ...params.contact,
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
        transactionId: string;
        /**
         * 注文メールを送信するかどうか
         * デフォルトはfalse
         */
        sendEmailMessage?: boolean;
        /**
         * インセンティブとしてポイントを付与する場合、ポイント数と対象口座を指定
         */
        incentives?: IIncentive[];
    }): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                sendEmailMessage: params.sendEmailMessage,
                incentives: params.incentives
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
        transactionId: string;
        /**
         * Eメールメッセージ属性
         */
        emailMessageAttributes: factory.creativeWork.message.email.IAttributes;
    }): Promise<factory.task.ITask<factory.taskName.SendEmailMessage>> {
        return this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/tasks/sendEmailNotification`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.emailMessageAttributes
        }).then(async (response) => response.json());
    }

    /**
     * 明示的に取引を中止する
     * 既に確定済、あるいは、期限切れの取引に対して実行するとNotFoundエラーが返されます。
     * @param params.transactionId 取引ID
     */
    public async cancel(params: {
        transactionId: string;
    }): Promise<void> {
        await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/cancel`,
            method: 'POST',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 取引検索
     */
    public async search(
        params: factory.transaction.ISearchConditions<factory.transactionType.PlaceOrder>
    ): Promise<ISearchResult<factory.transaction.ITransaction<factory.transactionType.PlaceOrder>[]>> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => {
            return {
                totalCount: Number(<string>response.headers.get('X-Total-Count')),
                data: await response.json()
            };
        });
    }

    /**
     * 取引に対するアクションを検索する
     */
    public async searchActionsByTransactionId(params: {
        id: string;
        sort: factory.action.ISortOrder;
    }): Promise<factory.action.IAction<factory.action.IAttributes<factory.actionType, any, any>>[]> {
        return this.fetch({
            uri: `/transactions/${this.typeOf}/${params.id}/actions`,
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
