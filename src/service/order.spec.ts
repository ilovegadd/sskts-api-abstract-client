// tslint:disable:no-implicit-dependencies
/**
 * order service test
 */
import * as cinerino from '@cinerino/api-abstract-client';
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

const API_ENDPOINT = 'https://localhost';

describe('注文サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let orders: client.service.Order;

    before(() => {
        const auth = new cinerino.auth.StubAuth();
        orders = new client.service.Order({
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

    it('注文照会結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(orders).expects('fetch').once().resolves(await myMock());

        const result = await orders.findByOrderInquiryKey({
            theaterCode: 'xxx',
            confirmationNumber: 123,
            telephone: 'xxx'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
