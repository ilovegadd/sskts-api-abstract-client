/**
 * 場所サービス
 */
import { OK } from 'http-status';

import * as factory from '../factory';
import { Service } from '../service';

/**
 * place service
 */
export class PlaceService extends Service {
    /**
     * 劇場検索
     */
    public async searchMovieTheaters(
        /**
         * 検索条件
         */
        params?: {}
    ): Promise<factory.place.movieTheater.IPlaceWithoutScreeningRoom[]> {
        return this.fetch({
            uri: '/places/movieTheater',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 劇場情報取得
     */
    public async findMovieTheater(params: {
        /**
         * 枝番号
         */
        branchCode: string;
    }): Promise<factory.place.movieTheater.IPlace> {
        return this.fetch({
            uri: `/places/movieTheater/${params.branchCode}`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
