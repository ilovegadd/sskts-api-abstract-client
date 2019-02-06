import { service } from '@cinerino/api-abstract-client';

import { OK } from 'http-status';

import * as factory from '../factory';

/**
 * 注文サービス
 */
export class OrderService extends service.Order {
    /**
     * 予約番号と電話番号で注文情報を取得する
     */
    public async findByOrderInquiryKey(
        params: factory.order.IOrderInquiryKey
    ): Promise<factory.order.IOrder> {
        return this.fetch({
            uri: '/orders/findByOrderInquiryKey',
            method: 'POST',
            body: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
