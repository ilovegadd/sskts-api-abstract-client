import { AuthClient } from './auth/authClient';

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
