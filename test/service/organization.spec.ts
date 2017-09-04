/**
 * organization service test
 * @ignore
 */

import { OK } from 'http-status';
import * as nock from 'nock';
import * as assert from 'power-assert';
import * as service from '../../';

import { TestAuthClient } from '../auth/testAuthClient';

const API_ENDPOINT = 'http://localhost:8081';

describe('organization service', () => {
    let organizations: service.Organization;

    before(() => {
        nock.cleanAll();

        const auth = new TestAuthClient();
        organizations = new service.Organization({
            auth: auth,
            endpoint: API_ENDPOINT
        });
    });

    beforeEach(() => {
        nock.cleanAll();
        nock.disableNetConnect();
    });

    it('劇場組織検索の結果が期待通り', async () => {
        const data: any[] = [];
        const scope = nock(API_ENDPOINT, {})
            .get(/\/organizations\/movieTheater[^?(.+)]*/)
            .reply(OK, { data: data });

        const result = await organizations.searchMovieTheaters({
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    it('枝番号で劇場組織検索の結果が期待通り', async () => {
        const data = {
            branchCode: 'xxx'
        };
        const scope = nock(API_ENDPOINT, {})
            .get(`/organizations/movieTheater/${data.branchCode}`)
            .reply(OK, { data: data });

        const result = await organizations.findMovieTheaterByBranchCode({
            branchCode: data.branchCode
        });
        assert.deepEqual(result, data);

        scope.done();
    });

    after(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });
});
