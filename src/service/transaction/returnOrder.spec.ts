// tslint:disable:no-implicit-dependencies

/**
 * 注文返品取引サービステスト
 * @ignore
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../../index';

import { StubAuthClient } from '../../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('注文返品取引サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let transactions: client.service.transaction.ReturnOrder;

    before(() => {
        const auth = new StubAuthClient();
        transactions = new client.service.transaction.ReturnOrder({
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

    it('取引開始結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.start({
            expires: new Date(),
            transactionId: 'transactionId'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('取引確定結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.confirm({
            transactionId: 'transactionId'
        });
        assert.deepEqual(result, data);
    });

    it('取引検索結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.search(<any>{});
        assert.deepEqual(result.data, data);
        sandbox.verify();
    });
});
