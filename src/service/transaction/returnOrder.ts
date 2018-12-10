/**
 * 注文返品取引サービス
 */
import { CREATED, OK } from 'http-status';

import * as factory from '../../factory';
import { ISearchResult, Service } from '../../service';

/**
 * 注文返品取引サービス
 */
export class ReturnOrderTransactionService extends Service {
    public typeOf: factory.transactionType.ReturnOrder = factory.transactionType.ReturnOrder;

    /**
     * 取引を開始する
     * @returns 注文返品取引オブジェクト
     */
    public async start(params: {
        /**
         * 取引期限
         * 指定した日時を過ぎると、取引を進行することはできなくなります。
         */
        expires: Date;
        /**
         * 返品したい注文取引ID
         */
        transactionId: string;
    }): Promise<factory.transaction.returnOrder.ITransaction> {
        return this.fetch({
            uri: '/transactions/returnOrder/start',
            method: 'POST',
            body: {
                expires: params.expires,
                transactionId: params.transactionId
            },
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 取引確定
     * @returns 注文返品取引結果
     */
    public async confirm(params: {
        /**
         * 返品取引ID
         */
        transactionId: string;
    }): Promise<factory.transaction.returnOrder.IResult> {
        return this.fetch({
            uri: `/transactions/returnOrder/${params.transactionId}/confirm`,
            method: 'POST',
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }

    /**
     * 取引検索
     */
    public async search(
        params: factory.transaction.ISearchConditions<factory.transactionType.ReturnOrder>
    ): Promise<ISearchResult<factory.transaction.ITransaction<factory.transactionType.ReturnOrder>[]>> {
        return this.fetch({
            uri: '/transactions/returnOrder',
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
}
