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
