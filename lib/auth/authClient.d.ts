/**
 * AuthClient abstract class
 * 抽象認証クライアント
 * @export
 * @abstract
 * @class
 */
export declare abstract class AuthClient {
    abstract fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any>;
    abstract getAccessToken(): Promise<string>;
}
