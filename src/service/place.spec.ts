// tslint:disable:no-implicit-dependencies
/**
 * place service test
 */
import * as cinerino from '@cinerino/api-abstract-client';
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

const API_ENDPOINT = 'https://localhost';

describe('place service', () => {
    let sandbox: sinon.SinonSandbox;
    let places: client.service.Place;

    before(() => {
        const auth = new cinerino.auth.StubAuth();
        places = new client.service.Place({
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

    it('劇場検索の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(places).expects('fetch').once().resolves(await myMock());

        const result = await places.searchMovieTheaters({
        });

        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('枝番号で劇場情報取得の結果が期待通り', async () => {
        const data = {
            branchCode: 'xxx'
        };
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(places).expects('fetch').once().resolves(await myMock());

        const result = await places.findMovieTheater({
            branchCode: data.branchCode
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
