/**
 * event service test
 * @ignore
 */

import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { TestAuthClient } from '../auth/testAuthClient';

const API_ENDPOINT = 'https://localhost';

describe('searchIndividualScreeningEvent()', () => {
    let sandbox: sinon.SinonSandbox;
    let events: sasaki.service.Event;

    before(() => {
        const auth = new TestAuthClient();
        events = new sasaki.service.Event({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('fetch結果が正常であればそのまま取得できるはず', async () => {
        const data: any[] = [];
        sandbox.stub(events, 'fetch').returns(Promise.resolve(data));

        const result = await events.searchIndividualScreeningEvent({
            day: 'day',
            theater: 'theater'
        });
        assert.deepEqual(result, data);
    });

    it('fetch結果が正常でなければエラーになるはず', async () => {
        const error = new sasaki.transporters.RequestError('invalid requrst');
        sandbox.stub(events, 'fetch').returns(Promise.reject(error));

        const fetchError = await events.searchIndividualScreeningEvent({
            day: 'day',
            theater: 'theater'
        }).catch((err) => err);
        assert.deepEqual(fetchError, error);
    });
});

describe('findIndividualScreeningEvent()', () => {
    let sandbox: sinon.SinonSandbox;
    let events: sasaki.service.Event;

    before(() => {
        const auth = new TestAuthClient();
        events = new sasaki.service.Event({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('fetch結果が正常であればそのまま取得できるはず', async () => {
        const data: any[] = [];
        sandbox.stub(events, 'fetch').returns(Promise.resolve(data));

        const result = await events.findIndividualScreeningEvent({
            identifier: 'identifier'
        });
        assert.deepEqual(result, data);
    });

    it('fetch結果が正常でなければエラーになるはず', async () => {
        const error = new sasaki.transporters.RequestError('invalid requrst');
        sandbox.stub(events, 'fetch').returns(Promise.reject(error));

        const fetchError = await events.findIndividualScreeningEvent({
            identifier: 'identifier'
        }).catch((err) => err);
        assert.deepEqual(fetchError, error);
    });
});
