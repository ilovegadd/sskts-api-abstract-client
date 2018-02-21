import * as factory from '@motionpicture/sskts-factory';
import { CREATED, NO_CONTENT, OK } from 'http-status';

import { Service } from '../service';

export type ICreditCard =
    factory.paymentMethod.paymentCard.creditCard.IUncheckedCardRaw | factory.paymentMethod.paymentCard.creditCard.IUncheckedCardTokenized;

export type IScreenEventReservation = factory.reservation.event.IEventReservation<factory.event.individualScreeningEvent.IEvent>;

/**
 * person service
 */
export class PersonService extends Service {
    /**
     * retrieve user contacts
     */
    public async getContacts(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
    }): Promise<factory.person.IContact> {
        return this.fetch({
            uri: `/people/${params.personId}/contacts`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * update contacts
     */
    public async updateContacts(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
        /**
         * contacts
         */
        contacts: factory.person.IContact;
    }): Promise<void> {
        return this.fetch({
            uri: `/people/${params.personId}/contacts`,
            method: 'PUT',
            body: params.contacts,
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * find credit cards
     * クレジットカード検索
     * @see example /example/person/handleCreditCards
     */
    public async findCreditCards(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
    }): Promise<factory.paymentMethod.paymentCard.creditCard.ICheckedCard[]> {
        return this.fetch({
            uri: `/people/${params.personId}/creditCards`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * add a credit card
     * クレジットカード追加
     * @return successfully created credit card info
     * @see example /example/person/handleCreditCards
     */
    public async addCreditCard(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
        /**
         * credit card info
         * クレジットカード情報(情報の渡し方にはいくつかパターンがあるので、型を参照すること)
         */
        creditCard: ICreditCard;
    }): Promise<factory.paymentMethod.paymentCard.creditCard.ICheckedCard> {
        return this.fetch({
            uri: `/people/${params.personId}/creditCards`,
            method: 'POST',
            body: params.creditCard,
            expectedStatusCodes: [CREATED]
        });
    }

    /**
     * delete a credit card by cardSeq
     * クレジットカード削除
     * @see /example/person/handleCreditCards
     */
    public async deleteCreditCard(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
        /**
         * cardSeq
         * カード連番
         */
        cardSeq: string;
    }): Promise<void> {
        return this.fetch({
            uri: `/people/${params.personId}/creditCards/${params.cardSeq}`,
            method: 'DELETE',
            expectedStatusCodes: [NO_CONTENT]
        });
    }

    /**
     * 口座照会
     */
    public async findAccount(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
    }): Promise<any> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 口座照会
     */
    public async searchAccountTradeActions(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
    }): Promise<any[]> {
        return this.fetch({
            uri: `/people/${params.personId}/accounts/actions/trade`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }

    /**
     * 座席予約の所有権を検索する
     */
    public async searchReservationOwnerships(params: {
        /**
         * person id
         * basically specify 'me' to retrieve contacts of login user
         */
        personId: string;
    }): Promise<factory.ownershipInfo.IOwnershipInfo<IScreenEventReservation>[]> {
        return this.fetch({
            uri: `/people/${params.personId}/ownershipInfos/reservation`,
            method: 'GET',
            qs: {},
            expectedStatusCodes: [OK]
        });
    }
}
