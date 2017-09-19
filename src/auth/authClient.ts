import { DefaultTransporter } from '../transporters';

/**
 * AuthClient abstract class
 * 抽象認証クライアント
 * @export
 * @abstract
 * @class
 */
export abstract class AuthClient {
    public abstract async fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any>;
    public abstract async getAccessToken(): Promise<string>;
}

/**
 * test auth client
 * テスト認証クライアント
 * @export
 * @class
 */
export class StubAuthClient implements AuthClient {
    // tslint:disable-next-line:prefer-function-over-method
    public async fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any> {
        return await (new DefaultTransporter(expectedStatusCodes)).fetch(url, options);
    }
    // tslint:disable-next-line:prefer-function-over-method
    public async getAccessToken(): Promise<string> {
        return 'access_token';
    }
}
