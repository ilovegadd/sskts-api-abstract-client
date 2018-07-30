// tslint:disable:no-implicit-dependencies

/**
 * place service test
 * @ignore
 */

import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('ownershipInfo service', () => {
    let sandbox: sinon.SinonSandbox;
    let ownershipInfo: sasaki.service.OwnershipInfo;

    before(() => {
        const auth = new StubAuthClient();
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
        const data: { count: number } = { count: 10 };
        sandbox.mock(ownershipInfo).expects('fetch').once().resolves(data);

        const result = await ownershipInfo.countByRegisterDateAndTheater({
            fromDate: new Date(),
            toDate: new Date(),
            theaterIds: []
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
