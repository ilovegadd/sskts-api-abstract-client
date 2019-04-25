// tslint:disable:no-implicit-dependencies
/**
 * person service test
 */
import * as cinerino from '@cinerino/api-abstract-client';
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

const API_ENDPOINT = 'https://localhost';

describe('person service', () => {
    let sandbox: sinon.SinonSandbox;
    let people: client.service.Person;

    before(() => {
        const auth = new cinerino.auth.StubAuth();
        people = new client.service.Person({
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

    it('連絡先取得の結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());
        const id = 'me';
        const result = await people.getProfile({
            id: id
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('連絡先更新の結果が期待通り', async () => {
        const id = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const profile = {
            givenName: 'xxx',
            familyName: 'xxx',
            telephone: 'xxx',
            email: 'xxx'
        };

        const result = await people.updateProfile({
            id: id,
            ...profile
        });
        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('会員プログラム登録の結果が期待通り', async () => {
        const id = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.registerProgramMembership({
            id: id,
            programMembershipId: 'programMembershipId',
            offerIdentifier: 'offerIdentifier',
            sellerType: client.factory.organizationType.MovieTheater,
            sellerId: 'sellerId'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('会員プログラム登録解除の結果が期待通り', async () => {
        const id = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.unRegisterProgramMembership({
            id: id,
            ownershipInfoIdentifier: 'ownershipInfoIdentifier'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('会員検索結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.search({
        });
        assert.deepEqual(result.data, data);
        sandbox.verify();
    });

    it('IDで会員検索結果が期待通り', async () => {
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.findById({ id: 'id' });
        assert.deepEqual(result, data);
        sandbox.verify();
    });
});
