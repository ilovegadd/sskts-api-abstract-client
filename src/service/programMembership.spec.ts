// tslint:disable:no-implicit-dependencies
/**
 * 所有権サービステスト
 * @ignore
 */
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('所有権サービス', () => {
    let sandbox: sinon.SinonSandbox;
    let programMembershipService: sasaki.service.ProgramMembership;

    before(() => {
        const auth = new StubAuthClient();
        programMembershipService = new sasaki.service.ProgramMembership({
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
        const data: any[] = [];
        sandbox.mock(programMembershipService).expects('fetch').once().resolves(data);
        const personId = 'me';

        const result = await programMembershipService.search({
            personId: personId
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
