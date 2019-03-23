import { factory, service } from '@cinerino/api-abstract-client';

import { OK } from 'http-status';

export interface IOrderInquiryKey {
    theaterCode: string;
    confirmationNumber: number;
    telephone: string;
}

/**
 * 注文サービス
 */
export class OrderService extends service.Order {
    /**
     * 予約番号と電話番号で注文情報を取得する
     */
    public async findByOrderInquiryKey(
        params: IOrderInquiryKey
    ): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: '/orders/findByOrderInquiryKey',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
