import { NO_CONTENT } from 'http-status';

import { Service } from '../service';

/**
 * Pecorino口座サービス
 */
export class AccountService extends Service {
    /**
     * Pecorinoポイントを入金する
     * 管理者権限が必要です。
     */
    public async deposit(params: {
        /**
         * 入金受取人情報
         */
        recipient: {
            id: string;
            name: string;
            url: string;
        };
        /**
         * 入金先口座番号
         */
        toAccountNumber: string;
        /**
         * 入金金額
         */
        amount: number;
        /**
         * 入金説明
         */
        notes?: string;
    }): Promise<void> {
        await this.fetch({
            uri: '/accounts/transactions/deposit',
            method: 'POST',
            body: params,
            expectedStatusCodes: [NO_CONTENT]
        });
    }
}
