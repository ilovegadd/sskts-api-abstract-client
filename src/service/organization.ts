/**
 * 組織サービス
 *
 * @namespace service.organization
 */

import * as factory from '@motionpicture/sskts-factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * organization service
 */
export class OrganizationService extends Service {
    /**
     * 劇場組織検索
     */
    public async searchMovieTheaters(
        /**
         * 検索条件
         */
        params?: {}
    ): Promise<factory.organization.movieTheater.IPublicFields[]> {
        return this.fetch({
            uri: '/organizations/movieTheater',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 枝番号で劇場組織検索
     */
    public async findMovieTheaterByBranchCode(params: {
        /**
         * 枝番号
         */
        branchCode: string;
    }): Promise<factory.organization.movieTheater.IPublicFields> {
        return this.fetch({
            uri: `/organizations/movieTheater/${params.branchCode}`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
}
