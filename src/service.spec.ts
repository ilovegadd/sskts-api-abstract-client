/**
 * service test
 * @ignore
 */

import * as assert from 'power-assert';
import * as querystring from 'querystring';
import * as sinon from 'sinon';

import { StubAuthClient } from './auth/authClient';
import { Service } from './service';
import { StubTransporter } from './transporters';

const API_ENDPOINT = 'https://example.com';

describe('fetch()', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('認証クライアントが正常であれば、レスポンスを取得できるはず', async () => {
        const response: any = { key: 'value' };

        const auth = new StubAuthClient();
        const service = new Service({
            auth: auth,
            endpoint: API_ENDPOINT
        });

        sandbox.mock(service.options.auth).expects('fetch').once().resolves(response);

        const result = await service.fetch(<any>{});

        assert.deepEqual(result, response);
        sandbox.verify();
    });

    it('認証不要な場合、transporterが正常であれば、レスポンスを取得できるはず', async () => {
        const response: any = { key: 'value' };

        const service = new Service({
            endpoint: API_ENDPOINT,
            transporter: new StubTransporter(response)
        });

        const result = await service.fetch(<any>{});

        assert.deepEqual(result, response);
        sandbox.verify();
    });

    it('クエリパラメータをオプションとして渡すと、リクエストURLにクエリ文字列が付加されるはず', async () => {
        const options = {
            uri: '/uri',
            qs: {
                key: 'value',
                key2: 'value2'
            }
        };
        const response: any = { key: 'value' };
        const querystrings = querystring.stringify(options.qs);
        console.error(querystrings);

        const auth = new StubAuthClient();
        const service = new Service({
            auth: auth,
            endpoint: API_ENDPOINT
        });

        sandbox.mock(service.options.auth).expects('fetch').once()
            .withArgs(sinon.match(new RegExp(`\\?${querystrings}$`))).resolves(response);

        const result = await service.fetch(<any>options);

        assert.deepEqual(result, response);
        sandbox.verify();
    });
});
