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
export interface IOptions {
    /**
     * API endpoint
     * @example
     * http://localhost:8081
     */
    endpoint: string;
    /**
     * OAuth2 client object
     */
    auth: AuthClient;
}
/**
 * base service class
 * @export
 * @class Service
 */
export declare class Service {
    options: IOptions;
    constructor(options: IOptions);
}
