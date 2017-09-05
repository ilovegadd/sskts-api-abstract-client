/**
 * organization service test
 * @ignore
 */

import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { TestAuthClient } from '../auth/testAuthClient';

const API_ENDPOINT = 'https://localhost';

describe('organization service', () => {
    let sandbox: sinon.SinonSandbox;
    let organizations: sasaki.service.Organization;

    before(() => {
        const auth = new TestAuthClient();
        organizations = new sasaki.service.Organization({
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
        sandbox.stub(organizations, 'fetch').returns(Promise.resolve(data));

        const result = await organizations.searchMovieTheaters({
        });
        assert.deepEqual(result, data);
    });

    it('枝番号で劇場組織検索の結果が期待通り', async () => {
        const data = {
            branchCode: 'xxx'
        };
        sandbox.stub(organizations, 'fetch').returns(Promise.resolve(data));

        const result = await organizations.findMovieTheaterByBranchCode({
            branchCode: data.branchCode
        });
        assert.deepEqual(result, data);
    });
});
