/**
 * サービスファクトリー
 */
import * as cinerino from '@cinerino/api-abstract-client';

export type IOptions = cinerino.service.IOptions;
export type IFetchOptions = cinerino.service.IFetchOptions;
export type ISearchResult<T> = cinerino.service.ISearchResult<T>;
/**
 * Baseサービス
 */
export class Service extends cinerino.service.Service { }
