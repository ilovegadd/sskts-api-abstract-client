/**
 * placeOrder transaction sasaki.service test
 * @ignore
 */

import { CREATED, NO_CONTENT, OK } from 'http-status';
import * as nock from 'nock';
import * as assert from 'power-assert';
import * as sasaki from '../../';

import { TestAuthClient } from '../../auth/testAuthClient';

const API_ENDPOINT = 'https://localhost';

describe('placeOrder transaction sasaki.service', () => {
    let transactions: sasaki.service.transaction.PlaceOrder;

    before(() => {
        nock.cleanAll();

        const auth = new TestAuthClient();
        transactions = new sasaki.service.transaction.PlaceOrder({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
    });

    it('取引開始結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .post(/^\/transactions\/placeOrder\/start$/)
            .reply(OK, { data: data });

        const result = await transactions.start({
            expires: new Date(),
            sellerId: 'sellerId'
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    it('座席仮予約結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .post(/^\/transactions\/placeOrder\/[^/]+\/seatReservationAuthorization$/)
            .reply(CREATED, { data: data });

        const result = await transactions.createSeatReservationAuthorization({
            transactionId: 'transactionId',
            eventIdentifier: 'eventIdentifier',
            offers: []
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    it('座席予約取消結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .delete(/^\/transactions\/placeOrder\/[^/]+\/seatReservationAuthorization\/[^/]+$/)
            .reply(NO_CONTENT, { data: data });

        const result = await transactions.cancelSeatReservationAuthorization({
            transactionId: 'transactionId',
            authorizationId: 'authorizationId'
        });
        assert.deepEqual(result, undefined);

        scope.done();
    });

    it('クレジットカードオーソリ結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .post(/^\/transactions\/placeOrder\/[^/]+\/paymentInfos\/creditCard$/)
            .reply(CREATED, { data: data });

        const result = await transactions.createCreditCardAuthorization({
            transactionId: 'transactionId',
            orderId: 'orderId',
            amount: 123,
            method: 'method',
            creditCard: <any>{}
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    it('クレジットカードオーソリ取消結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .delete(/^\/transactions\/placeOrder\/[^/]+\/paymentInfos\/creditCard\/[^/]+$/)
            .reply(NO_CONTENT, { data: data });

        const result = await transactions.cancelCreditCardAuthorization({
            transactionId: 'transactionId',
            authorizationId: 'authorizationId'
        });
        assert.deepEqual(result, undefined);

        scope.done();
    });

    it('ムビチケ追加結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .post(/^\/transactions\/placeOrder\/[^/]+\/discountInfos\/mvtk$/)
            .reply(CREATED, { data: data });

        const result = await transactions.createMvtkAuthorization({
            transactionId: 'transactionId',
            mvtk: <any>{}
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    it('ムビチケ取消結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .delete(/^\/transactions\/placeOrder\/[^/]+\/discountInfos\/mvtk\/[^/]+$/)
            .reply(NO_CONTENT, { data: data });

        const result = await transactions.cancelMvtkAuthorization({
            transactionId: 'transactionId',
            authorizationId: 'authorizationId'
        });
        assert.deepEqual(result, undefined);

        scope.done();
    });

    it('購入者情報登録結果が期待通り', async () => {
        const scope = nock(API_ENDPOINT, {})
            .put(/^\/transactions\/placeOrder\/[^/]+\/customerContact$/)
            .reply(NO_CONTENT);

        const result = await transactions.setCustomerContact({
            transactionId: 'transactionId',
            contact: <any>{}
        });
        assert.deepEqual(result, undefined);

        scope.done();
    });

    it('取引確定結果が期待通り', async () => {
        const data = {};
        const scope = nock(API_ENDPOINT, {})
            .post(/^\/transactions\/placeOrder\/[^/]+\/confirm$/)
            .reply(CREATED, { data: data });

        const result = await transactions.confirm({
            transactionId: 'transactionId'
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    it('メール通知結果が期待通り', async () => {
        const scope = nock(API_ENDPOINT, {})
            .post(/^\/transactions\/placeOrder\/[^/]+\/tasks\/sendEmailNotification$/)
            .reply(NO_CONTENT);

        const result = await transactions.sendEmailNotification({
            transactionId: 'transactionId',
            emailNotification: <any>{}
        });
        assert.deepEqual(result, undefined);

        scope.done();
    });

    after(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });
});
