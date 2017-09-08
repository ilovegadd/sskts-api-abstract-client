/**
 * transporter abstract class
 * トランスポーター抽象クラス
 * @export
 * @class
 * @abstract
 */
export declare abstract class Transporter {
    abstract fetch(url: string, options: RequestInit): Promise<any>;
}
export declare type IBodyResponseCallback = Promise<any>;
/**
 * RequestError
 * @export
 * @class
 */
export declare class RequestError extends Error {
    code: number;
    errors: Error[];
}
/**
 * stub transporter
 * スタブトランポーター
 * @export
 * @class
 */
export declare class StubTransporter implements Transporter {
    body: any;
    constructor(body: any);
    fetch(url: string, options: RequestInit): Promise<any>;
}
/**
 * DefaultTransporter
 * @export
 * @class
 */
export declare class DefaultTransporter implements Transporter {
    /**
     * Default user agent.
     */
    static readonly USER_AGENT: string;
    expectedStatusCodes: number[];
    constructor(expectedStatusCodes: number[]);
    /**
     * Configures request options before making a request.
     */
    static CONFIGURE(options: RequestInit): RequestInit;
    /**
     * Makes a request with given options and invokes callback.
     */
    fetch(url: string, options: RequestInit): Promise<any>;
    /**
     * Wraps the response callback.
     */
    private wrapCallback(response);
}
