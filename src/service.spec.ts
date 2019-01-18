// tslint:disable:no-implicit-dependencies
/**
 * service test
 */
import * as cinerino from '@cinerino/api-abstract-client';
import { } from 'mocha';
import * as assert from 'power-assert';
import * as querystring from 'querystring';
import * as sinon from 'sinon';

import { Service } from './service';

const API_ENDPOINT = 'https://example.com';

describe('fetch()', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('認証クライアントが正常であれば、レスポンスを取得できるはず', async () => {
        const response: any = { key: 'value' };

        const auth = new cinerino.auth.StubAuth();
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
            transporter: new cinerino.transporters.StubTransporter(response)
        });

        const result = await service.fetch(<any>{});
        assert.deepEqual(result.body, response);
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

        const auth = new cinerino.auth.StubAuth();
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

    it('Date型のクエリパラメータを渡すと、リクエストURLにISO 8601形式文字列が付加されるはず', async () => {
        const now = new Date();
        const options = {
            uri: '/uri',
            qs: {
                now: now
            }
        };
        const response: any = { key: 'value' };
        const querystrings = `now=${encodeURIComponent(now.toISOString())}`;

        const auth = new cinerino.auth.StubAuth();
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

    it('authオプションもtransporterオプションも未定義であれば、内部的にDefaultTransporterインスタンスが生成されてfetchメソッドが呼ばれるはず', async () => {
        const options = {};
        const service = new Service({
            endpoint: API_ENDPOINT
        });

        sandbox.mock(cinerino.transporters.DefaultTransporter.prototype).expects('fetch').once();

        await service.fetch(<any>options);
        sandbox.verify();
    });
});
