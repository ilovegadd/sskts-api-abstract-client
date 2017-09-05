import { AuthClient } from '../auth/authClient';
import { DefaultTransporter } from '../transporters';

/**
 * test auth client
 * テスト認証クライアント
 * @export
 * @class
 */
export class TestAuthClient implements AuthClient {
    // tslint:disable-next-line:prefer-function-over-method
    public async fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any> {
        return await (new DefaultTransporter(expectedStatusCodes)).fetch(url, options);
    }
    // tslint:disable-next-line:prefer-function-over-method
    public async getAccessToken(): Promise<string> {
        return 'access_token';
    }
}
