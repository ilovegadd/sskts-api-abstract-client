import { AuthClient } from './auth/authClient';
import { Transporter } from './transporters';
/**
 * service constructor options
 * @export
 * @interface
 */
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
    auth?: AuthClient;
    /**
     * transporter object
     */
    transporter?: Transporter;
}
export interface IFetchOptions {
    uri: string;
    form?: any;
    qs?: any;
    method: string;
    headers?: {
        [key: string]: any;
    };
    body?: any;
    expectedStatusCodes: number[];
}
/**
 * base service class
 * @export
 * @class Service
 */
export declare class Service {
    options: IOptions;
    constructor(options: IOptions);
    /**
     * Create and send request to API
     */
    fetch(options: IFetchOptions): Promise<any>;
}
