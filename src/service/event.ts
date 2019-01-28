import { OK } from 'http-status';

import * as factory from '../factory';
import { ISearchResult, Service } from '../service';

/**
 * event service
 */
export class EventService extends Service {
    /**
     * 上映イベント検索(ページング機能付き)
     */
    public async searchIndividualScreeningEventWithPagination(
        params: factory.event.screeningEvent.ISearchConditions
    ): Promise<ISearchResult<factory.event.screeningEvent.IEventWithOffer[]>> {
        return this.fetch({
            uri: '/events/individualScreeningEvent',
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

    /**
     * 上映イベント検索
     * @deprecated Use searchIndividualScreeningEventWithPagination
     */
    public async searchIndividualScreeningEvent(
        /**
         * 検索条件
         */
        params: factory.event.screeningEvent.ISearchConditions
    ): Promise<factory.event.screeningEvent.IEventWithOffer[]> {
        return this.fetch({
            uri: '/events/individualScreeningEvent',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }

    /**
     * 上映イベント情報取得
     */
    public async findIndividualScreeningEvent(params: {
        /**
         * イベント識別子
         */
        identifier: string;
    }): Promise<factory.event.screeningEvent.IEventWithOffer> {
        return this.fetch({
            uri: `/events/individualScreeningEvent/${params.identifier}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
