// tslint:disable:no-implicit-dependencies
/**
 * organization service test
 */
import * as cinerino from '@cinerino/api-abstract-client';
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

const API_ENDPOINT = 'https://localhost';

describe('organization service', () => {
    let sandbox: sinon.SinonSandbox;
    let organizations: client.service.Organization;

    before(() => {
        const auth = new cinerino.auth.StubAuth();
        organizations = new client.service.Organization({
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

    it('劇場組織検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(organizations).expects('fetch').once().resolves(await myMock());

        const result = await organizations.searchMovieTheaters({
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('枝番号で劇場組織検索の結果が期待通り', async () => {
        const data = { branchCode: 'xxx' };
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(organizations).expects('fetch').once().resolves(await myMock());

        const result = await organizations.findMovieTheaterByBranchCode({
            branchCode: data.branchCode
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
