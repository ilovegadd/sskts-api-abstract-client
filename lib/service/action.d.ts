import * as factory from '@motionpicture/sskts-factory';
import { Service } from '../service';
/**
 * action service
 * @class
 */
export declare class ActionService extends Service {
    /**
     * チケット印刷
     */
    printTicket(
        /**
         * チケットオブジェクト
         */
        params: factory.action.transfer.print.ticket.ITicket): Promise<factory.action.transfer.print.ticket.IAction>;
    /**
     * チケット印刷アクション検索
     */
    searchPrintTicket(
        /**
         * 検索条件
         */
        params: factory.action.transfer.print.ticket.ISearchConditions): Promise<factory.event.individualScreeningEvent.IEventWithOffer>;
}
