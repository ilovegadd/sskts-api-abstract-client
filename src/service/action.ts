import { factory } from '@cinerino/api-abstract-client';
import { CREATED, OK } from 'http-status';

import { Service } from '../service';

export type IPrintTicketAction = factory.action.transfer.print.ticket.IAction;

/**
 * アクションサービス
 */
export class ActionService extends Service {
    /**
     * チケット印刷
     */
    public async printTicket(
        /**
         * チケットオブジェクト
         */
        params: factory.action.transfer.print.ticket.ITicket
    ): Promise<IPrintTicketAction> {
        return this.fetch({
            uri: '/actions/print/ticket',
            method: 'POST',
            body: params,
            expectedStatusCodes: [CREATED]
        }).then(async (response) => response.json());
    }

    /**
     * チケット印刷アクション検索
     */
    public async searchPrintTicket(
        /**
         * 検索条件
         */
        params: factory.action.transfer.print.ticket.ISearchConditions
    ): Promise<IPrintTicketAction[]> {
        return this.fetch({
            uri: '/actions/print/ticket',
            method: 'GET',
            qs: params,
            expectedStatusCodes: [OK]
        }).then(async (response) => response.json());
    }
}
