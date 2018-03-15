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

    /**
     * レストラン検索
     */
    // tslint:disable-next-line:no-single-line-block-comment
    /* istanbul ignore next */
    public async searchRestaurants(
        /**
         * 検索条件
         */
        params?: {}
    ): Promise<IRestaurantOrganization[]> {
        return this.fetch({
            uri: '/organizations/restaurant',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        });
    }
}

export interface IRestaurantOrganization {
    typeOf: 'Restaurant';
    aggregateRating: {
        typeOf: 'AggregateRating';
        ratingValue: number;
        reviewCount: number;
    };
    name: string;
    openingHours: any[];
    telephone: string;
    url: string;
    image: string;
    hasMenu: {
        typeOf: 'Menu';
        hasMenuSection: {
            typeOf: 'MenuSection';
            name: string;
            description: string;
            image: string[];
            hasMenuItem: {
                identifier: string;
                typeOf: 'MenuItem';
                name: string;
                description: string;
                offers: {
                    identifier: string;
                    typeOf: 'Offer';
                    price: number;
                    priceCurrency: factory.priceCurrency;
                }[];
            }[];
        }[];
    }[];
}
