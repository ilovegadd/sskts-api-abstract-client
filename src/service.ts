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
export class Service {
    public options: IOptions;

    constructor(options: IOptions) {
        this.options = options;
    }
}
