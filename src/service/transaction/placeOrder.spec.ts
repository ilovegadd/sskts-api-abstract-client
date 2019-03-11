// tslint:disable:no-implicit-dependencies
/**
 * placeOrder transaction client.service test
 */
import * as cinerino from '@cinerino/api-abstract-client';
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../../index';

const API_ENDPOINT = 'https://localhost';

describe('placeOrder transaction client.service', () => {
    let sandbox: sinon.SinonSandbox;
    let transactions: client.service.transaction.PlaceOrder;

    before(() => {
        const auth = new cinerino.auth.StubAuth();
        transactions = new client.service.transaction.PlaceOrder({
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
            sellerId: 'sellerId',
            passportToken: 'passportToken'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席仮予約結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.createSeatReservationAuthorization({
            transactionId: 'transactionId',
            eventIdentifier: 'eventIdentifier',
            offers: []
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('座席予約取消結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.cancelSeatReservationAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('座席予約変更結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.changeSeatReservationOffers({
            transactionId: 'transactionId',
            actionId: 'actionId',
            eventIdentifier: 'eventIdentifier',
            offers: [<any>{}]
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカードオーソリ結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.createCreditCardAuthorization({
            transactionId: 'transactionId',
            orderId: 'orderId',
            amount: 123,
            method: 'method',
            creditCard: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカードオーソリ取消結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.cancelCreditCardAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('ムビチケ追加結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.createMvtkAuthorization({
            transactionId: 'transactionId',
            mvtk: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('ムビチケ取消結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.cancelMvtkAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('購入者情報登録結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.setCustomerContact({
            transactionId: 'transactionId',
            contact: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('取引確定結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.confirm({
            transactionId: 'transactionId',
            sendEmailMessage: true
        });
        assert.deepEqual(result, data);
    });

    it('メール通知結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.sendEmailNotification({
            transactionId: 'transactionId',
            emailMessageAttributes: <any>{}
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('ポイント口座承認アクションの結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.createPecorinoPaymentAuthorization({
            transactionId: 'transactionId',
            amount: 1234,
            fromAccountNumber: '12345'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('ポイント口座オーソリ取消結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.cancelPecorinoPaymentAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('ポイントインセンティブ承認アクションの結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.createPecorinoAwardAuthorization({
            transactionId: 'transactionId',
            amount: 1234,
            toAccountNumber: '12345'
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('ポイントインセンティブオーソリ取消結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.cancelPecorinoAwardAuthorization({
            transactionId: 'transactionId',
            actionId: 'actionId'
        });

        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('取引中止結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.cancel({
            transactionId: 'transactionId'
        });
        assert.deepEqual(result, undefined);
    });

    it('取引検索結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.search(<any>{});
        assert.deepEqual(result.data, data);
        sandbox.verify();
    });

    it('取引に対するアクション検索結果が期待通り', async () => {
        const data: any[] = [];
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(transactions).expects('fetch').once().resolves(await myMock());

        const result = await transactions.searchActionsByTransactionId(<any>{});
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
