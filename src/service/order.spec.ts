/**
 * order service test
 * @ignore
 */

import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { TestAuthClient } from '../auth/testAuthClient';

const API_ENDPOINT = 'https://localhost';

describe('findByOrderInquiryKey()', () => {
    let sandbox: sinon.SinonSandbox;
    let orders: sasaki.service.Order;

    before(() => {
        const auth = new TestAuthClient();
        orders = new sasaki.service.Order({
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
        sandbox.stub(orders, 'fetch').returns(Promise.resolve(data));

        const result = await orders.findByOrderInquiryKey({
            theaterCode: 'xxx',
            confirmationNumber: 123,
            telephone: 'xxx'
        });
        assert.deepEqual(result, data);
    });
});
