import { AuthClient } from './service';
export interface IOptions {
    baseUrl: string;
    uri: string;
    form?: any;
    auth?: AuthClient;
    qs?: any;
    method: string;
    headers?: {
        [key: string]: any;
    };
    body?: any;
    expectedStatusCodes: number[];
}
/**
 * Create and send request to API
 */
declare function apiFetch(options: IOptions): Promise<any>;
export default apiFetch;
