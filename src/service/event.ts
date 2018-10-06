import * as factory from '@motionpicture/sskts-factory';
import { OK } from 'http-status';

import { Service } from '../service';

/**
 * event service
 */
export class EventService extends Service {
    /**
     * 上映イベント検索
     */
    public async searchIndividualScreeningEvent(
        /**
         * 検索条件
         */
        params: factory.event.individualScreeningEvent.ISearchConditions
    ): Promise<factory.event.individualScreeningEvent.IEventWithOffer[]> {
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
    }): Promise<factory.event.individualScreeningEvent.IEventWithOffer> {
        return this.fetch({
            uri: `/events/individualScreeningEvent/${params.identifier}`,
            method: 'GET',
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
