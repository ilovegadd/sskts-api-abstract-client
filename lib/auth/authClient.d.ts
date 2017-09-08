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
/**
 * test auth client
 * テスト認証クライアント
 * @export
 * @class
 */
export declare class StubAuthClient implements AuthClient {
    fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any>;
    getAccessToken(): Promise<string>;
}
