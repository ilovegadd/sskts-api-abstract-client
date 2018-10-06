// tslint:disable:no-implicit-dependencies
/**
 * 所有権サービステスト
 * @ignore
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('所有権サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let programMembershipService: client.service.ProgramMembership;

    before(() => {
        const auth = new StubAuthClient();
        programMembershipService = new client.service.ProgramMembership({
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

    it('所有権検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(programMembershipService).expects('fetch').once().resolves(await myMock());
        const personId = 'me';

        const result = await programMembershipService.search({
            personId: personId
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
