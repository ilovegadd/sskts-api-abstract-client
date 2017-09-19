/**
 * 注文取引サービス
 *
 * @namespace service.transaction.placeOrder
 */

import * as factory from '@motionpicture/sskts-factory';
import { CREATED, NO_CONTENT, OK } from 'http-status';

import { Service } from '../../service';

export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw |
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized |
    factory.paymentMethod.paymentCard.creditCard.IUnauthorizedCardOfMember;

export interface IAuthorization {
    id: string;
    price: number;
}

/**
 * placeOrder transaction service
 *
 * @class PlaceOrderTransactionService
 */
export class PlaceOrderTransactionService extends Service {
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
    }): Promise<factory.transaction.placeOrder.ITransaction> {
        return this.fetch({
            uri: '/transactions/placeOrder/start',
            method: 'POST',
            body: {
                // tslint:disable-next-line:no-magic-numbers
                expires: (params.expires.getTime() / 1000).toFixed(0), // unix timestamp
                sellerId: params.sellerId
            },
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 取引に座席予約を追加する
     */
    public async createSeatReservationAuthorization(params: {
        /**
         * transaction ID
         */
        transactionId: string;
        /**
         * イベント識別子
         */
        eventIdentifier: string;
        /**
         * 座席販売情報
         */
        offers: factory.offer.ISeatReservationOffer[];
    }): Promise<factory.action.authorize.seatReservation.IAction> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/seatReservationAuthorization`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                eventIdentifier: params.eventIdentifier,
                offers: params.offers
            }
        });
    }

    /**
     * 座席予約取消
     */
    public async cancelSeatReservationAuthorization(params: {
        /**
         * transaction ID
         */
        transactionId: string;
        /**
         * authorization ID
         */
        authorizationId: string;
    }): Promise<void> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/seatReservationAuthorization/${params.authorizationId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * クレジットカードのオーソリを取得する
     */
    public async createCreditCardAuthorization(params: {
        /**
         * transaction ID
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
    }): Promise<IAuthorization> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/paymentInfos/creditCard`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: {
                orderId: params.orderId,
                amount: params.amount,
                method: params.method,
                creditCard: params.creditCard
            }
        });
    }

    /**
     * クレジットカードオーソリ取消
     */
    public async cancelCreditCardAuthorization(params: {
        /**
         * transaction ID
         */
        transactionId: string;
        /**
         * authorization ID
         */
        authorizationId: string;
    }): Promise<void> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/paymentInfos/creditCard/${params.authorizationId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 決済方法として、ムビチケを追加する
     */
    public async createMvtkAuthorization(params: {
        /**
         * transaction ID
         */
        transactionId: string;
        /**
         * ムビチケ情報
         */
        mvtk: factory.action.authorize.mvtk.IObject;
    }): Promise<IAuthorization> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/discountInfos/mvtk`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.mvtk
        });
    }

    /**
     * ムビチケ取消
     */
    public async cancelMvtkAuthorization(params: {
        /**
         * transaction ID
         */
        transactionId: string;
        /**
         * authorization ID
         */
        authorizationId: string;
    }): Promise<void> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/discountInfos/mvtk/${params.authorizationId}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * register a customer contact
     */
    public async setCustomerContact(params: {
        /**
         * transaction ID
         */
        transactionId: string;
        /**
         * customer contact info
         */
        contact: factory.transaction.placeOrder.ICustomerContact;
    }): Promise<factory.transaction.placeOrder.ICustomerContact> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/customerContact`,
            method: 'PUT',
            expectedStatusCodes: [CREATED],
            body: params.contact
        });
    }

    /**
     * 取引確定
     */
    public async confirm(params: {
        /**
         * transaction ID
         */
        transactionId: string;
    }): Promise<factory.order.IOrder> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * 確定した取引に関して、購入者にメール通知を送信する
     */
    public async sendEmailNotification(params: {
        /**
         * transaction ID
         */
        transactionId: string;
        /**
         * Eメールメッセージ属性
         */
        emailMessageAttributes: factory.creativeWork.message.email.IAttributes
    }): Promise<factory.order.IOrder> {
        return await this.fetch({
            uri: `/transactions/placeOrder/${params.transactionId}/tasks/sendEmailNotification`,
            method: 'POST',
            expectedStatusCodes: [CREATED],
            body: params.emailMessageAttributes
        });
    }
}
