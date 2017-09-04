import * as service from '../../';

export class TestAuthClient {
    public async fetch(url: string, options: RequestInit, expectedStatusCodes: number[]): Promise<any> {
        return await (new service.transporters.DefaultTransporter(expectedStatusCodes)).fetch(url, options);
    };
    public async getAccessToken(): Promise<string> {
        return 'access_token';
    }
}
