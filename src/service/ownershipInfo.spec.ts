// tslint:disable:no-implicit-dependencies
/**
 * place service test
 */
import * as cinerino from '@cinerino/api-abstract-client';
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

const API_ENDPOINT = 'https://localhost';

describe('ownershipInfo service', () => {
    let sandbox: sinon.SinonSandbox;
    let ownershipInfo: sasaki.service.OwnershipInfo;

    before(() => {
        const auth = new cinerino.auth.StubAuth();
        ownershipInfo = new sasaki.service.OwnershipInfo({
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

    it('正しい結果をもらえるはず', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(ownershipInfo).expects('fetch').once().resolves(await myMock());

        const result = await ownershipInfo.countByRegisterDateAndTheater({
            fromDate: new Date(),
            toDate: new Date(),
            theaterIds: []
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
