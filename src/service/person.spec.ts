// tslint:disable:no-implicit-dependencies
/**
 * person service test
 * @ignore
 */
import * as fetchMock from 'fetch-mock';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as client from '../index';

import { StubAuthClient } from '../auth/authClient';

const API_ENDPOINT = 'https://localhost';

describe('person service', () => {
    let sandbox: sinon.SinonSandbox;
    let people: client.service.Person;

    before(() => {
        const auth = new StubAuthClient();
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
        const personId = 'me';
        const result = await people.getContacts({
            personId: personId
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('連絡先更新の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const contacts = {
            givenName: 'xxx',
            familyName: 'xxx',
            telephone: 'xxx',
            email: 'xxx'
        };

        const result = await people.updateContacts({
            personId: personId,
            contacts: contacts
        });
        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('クレジットカード検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.findCreditCards({
            personId: personId
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカード追加の結果が期待通り', async () => {
        const personId = 'me';
        const creditCard = <any>{};
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.addCreditCard({
            personId: personId,
            creditCard: creditCard
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('クレジットカード削除の結果が期待通り', async () => {
        const personId = 'me';
        const cardSeq = 'xxx';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.deleteCreditCard({
            personId: personId,
            cardSeq: cardSeq
        });
        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('所有権検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.searchOwnershipInfos({
            goodType: client.factory.reservationType.EventReservation,
            ownedBy: personId
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座開設の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.openAccount({
            personId: personId,
            name: 'name'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座解約の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.closeAccount({
            personId: personId,
            accountNumber: '12345'
        });
        assert.deepEqual(result, undefined);
        sandbox.verify();
    });

    it('口座照会の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.findAccounts({
            personId: personId
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('口座取引履歴検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.searchAccountMoneyTransferActions({
            personId: personId,
            accountNumber: '12345'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('会員プログラム登録の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.registerProgramMembership({
            personId: personId,
            programMembershipId: 'programMembershipId',
            offerIdentifier: 'offerIdentifier',
            sellerType: client.factory.organizationType.MovieTheater,
            sellerId: 'sellerId'
        });
        assert.deepEqual(result, data);
        sandbox.verify();
    });

    it('会員プログラム登録解除の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        const myMock = fetchMock.sandbox().mock('*', data);
        sandbox.mock(people).expects('fetch').once().resolves(await myMock());

        const result = await people.unRegisterProgramMembership({
            personId: personId,
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
});
