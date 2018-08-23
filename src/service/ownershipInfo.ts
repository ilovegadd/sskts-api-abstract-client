/**
 * 所有権サービス
 *
 * @namespace service.ownershipInfo
 */

import { OK } from 'http-status';

import { Service } from '../service';

/**
 * organization service
 */
export class OwnershipInfoService extends Service {
    /**
     * 登録日と劇場で会員数をカウント
     */
    public async countByRegisterDateAndTheater(
        /**
         * 検索条件
         * fromDateとtoDateの時間を注意して
         */
        params: {
            /**
             * この日から検索する
             */
            fromDate: Date;
            /**
             * この日まで検索する
             */
            toDate: Date;
            /**
             * 劇場のID
             */
            theaterIds: string[];
        }
    ): Promise<{ count: number }> {
        return this.fetch({
            uri: '/ownershipInfos/countByRegisterDateAndTheater',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }
}
