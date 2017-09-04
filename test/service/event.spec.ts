/**
 * event service test
 * @ignore
 */

import { OK } from 'http-status';
import * as nock from 'nock';
import * as assert from 'power-assert';
import * as service from '../../';

import { TestAuthClient } from '../auth/testAuthClient';

const API_ENDPOINT = 'http://localhost:8081';

describe('event service', () => {
    let events: service.Event;

    before(() => {
        nock.cleanAll();

        const auth = new TestAuthClient();
        events = new service.Event({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
    });

    it('上映イベント検索の結果が期待通り', async () => {
        const data: any[] = [];
        const scope = nock(API_ENDPOINT, {})
            .get(/^\/events\/individualScreeningEvent\?(.+)/)
            .reply(OK, { data: data });

        const result = await events.searchIndividualScreeningEvent({
            day: 'day',
            theater: 'theater'
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    it('identifierで上映イベント取得の結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .get(/^\/events\/individualScreeningEvent\/[^/]+$/)
            // .times(2)
            .reply(OK, { data: data });

        const result = await events.findIndividualScreeningEvent({
            identifier: 'identifier'
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    after(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });
});
