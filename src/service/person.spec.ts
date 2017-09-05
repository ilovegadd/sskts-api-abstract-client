/**
 * person service test
 * @ignore
 */

import * as assert from 'power-assert';
import * as sinon from 'sinon';
import * as sasaki from '../index';

import { TestAuthClient } from '../auth/testAuthClient';

const API_ENDPOINT = 'https://localhost';

describe('person service', () => {
    let sandbox: sinon.SinonSandbox;
    let people: sasaki.service.Person;

    before(() => {
        const auth = new TestAuthClient();
        people = new sasaki.service.Person({
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
        sandbox.stub(people, 'fetch').returns(Promise.resolve(data));
        const personId = 'me';

        const result = await people.getContacts({
            personId: personId
        });
        assert.deepEqual(result, data);
    });

    it('連絡先更新の結果が期待通り', async () => {
        const personId = 'me';
        const data = undefined;
        sandbox.stub(people, 'fetch').returns(Promise.resolve(data));

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
        assert.deepEqual(result, data);
    });

    it('クレジットカード検索の結果が期待通り', async () => {
        const personId = 'me';
        const data = {};
        sandbox.stub(people, 'fetch').returns(Promise.resolve(data));

        const result = await people.findCreditCards({
            personId: personId
        });
        assert.deepEqual(result, data);
    });

    it('クレジットカード追加の結果が期待通り', async () => {
        const personId = 'me';
        const creditCard = <any>{};
        const data = {};
        sandbox.stub(people, 'fetch').returns(Promise.resolve(data));

        const result = await people.addCreditCard({
            personId: personId,
            creditCard: creditCard
        });
        assert.deepEqual(result, data);
    });

    it('クレジットカード削除の結果が期待通り', async () => {
        const personId = 'me';
        const cardSeq = 'xxx';
        const data = undefined;
        sandbox.stub(people, 'fetch').returns(Promise.resolve(data));

        const result = await people.deleteCreditCard({
            personId: personId,
            cardSeq: cardSeq
        });
        assert.deepEqual(result, undefined);
    });
});
