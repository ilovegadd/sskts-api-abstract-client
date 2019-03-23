import { factory } from '@cinerino/api-abstract-client';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * 会員プログラムサービス
 */
export class ProgramMembershipService extends Service {
    /**
     * 検索
     */
    public async search(
        /**
         * 検索条件
         */
        params: any
    ): Promise<factory.programMembership.IProgramMembership[]> {
        return this.fetch({
            uri: '/programMemberships',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
