// tslint:disable:no-implicit-dependencies

/**
 * event service test
 * @ignore
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('searchIndividualScreeningEvent()', () => {
    let sandbox: sinon.SinonSandbox;
    let events: client.service.Event;

    before(() => {
        const auth = new StubAuthClient();
        events = new client.service.Event({
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
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(events).expects('fetch').once().resolves(await myMock());

        const result = await events.searchIndividualScreeningEvent({});
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('fetch結果が正常でなければエラーになるはず', async () => {
        const error = new client.transporters.RequestError('invalid request');
        sandbox.mock(events).expects('fetch').once().rejects(error);

        const result = await events.searchIndividualScreeningEvent({
        }).catch((err) => err);

        assert.deepEqual(result, error);
        sandbox.verify();
    });
});

describe('findIndividualScreeningEvent()', () => {
    let sandbox: sinon.SinonSandbox;
    let events: client.service.Event;

    before(() => {
        const auth = new StubAuthClient();
        events = new client.service.Event({
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
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(events).expects('fetch').once().resolves(await myMock());

        const result = await events.findIndividualScreeningEvent({
            identifier: 'identifier'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('fetch結果が正常でなければエラーになるはず', async () => {
        const error = new client.transporters.RequestError('invalid request');
        sandbox.mock(events).expects('fetch').once().rejects(error);

        const result = await events.findIndividualScreeningEvent({
            identifier: 'identifier'
        }).catch((err) => err);

        assert.deepEqual(result, error);
        sandbox.verify();
    });
});
