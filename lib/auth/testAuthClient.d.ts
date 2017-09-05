import { AuthClient } from '../auth/authClient';
/**
 * test auth client
 * テスト認証クライアント
 * @export
 * @class
 */
export declare class TestAuthClient implements AuthClient {
    fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any>;
    getAccessToken(): Promise<string>;
}
