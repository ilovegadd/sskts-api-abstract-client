/**
 * order service test
 * @ignore
 */

import { OK } from 'http-status';
import * as nock from 'nock';
import * as assert from 'power-assert';
import * as sasaki from '../../';

import { TestAuthClient } from '../auth/testAuthClient';

const API_ENDPOINT = 'https://localhost';

describe('order service', () => {
    let orders: sasaki.service.Order;

    before(() => {
        nock.cleanAll();

        const auth = new TestAuthClient();
        orders = new sasaki.service.Order({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
    });

    it('注文照会の結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .post('/orders/findByOrderInquiryKey', {})
            .reply(OK, { data: data });

        const result = await orders.findByOrderInquiryKey({
            theaterCode: 'xxx',
            confirmationNumber: 123,
            telephone: 'xxx'
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    after(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });
});
