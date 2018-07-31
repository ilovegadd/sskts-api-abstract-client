// tslint:disable:no-implicit-dependencies
/**
 * order service test
 * @ignore
 */
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('注文サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let orders: client.service.Order;

    before(() => {
        const auth = new StubAuthClient();
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
        sandbox.mock(orders).expects('fetch').once().resolves(data);

        const result = await orders.findByOrderInquiryKey({
            theaterCode: 'xxx',
            confirmationNumber: 123,
            telephone: 'xxx'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('注文検索結果が期待通り', async () => {
        const data = {};
        sandbox.mock(orders).expects('fetch').once().resolves(data);

        const result = await orders.search({
            orderDateFrom: new Date(),
            orderDateThrough: new Date()
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
