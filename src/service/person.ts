import { factory, service } from '@cinerino/api-abstract-client';
import { ACCEPTED } from 'http-status';

/**
 * ユーザーサービス
 */
export class PersonService extends service.Person {
    /**
     * 会員プログラムに登録する
     */
    public async registerProgramMembership(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * 会員プログラムID
         */
        programMembershipId: string;
        /**
         * 会員プログラムに対するオファー識別子
         */
        offerIdentifier: string;
        /**
         * 販売者タイプ
         */
        sellerType: factory.organizationType;
        /**
         * 販売者ID
         */
        sellerId: string;
    }): Promise<factory.task.ITask<factory.taskName.RegisterProgramMembership>> {
        const id = (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/programMembership/register`,
            method: 'PUT',
            body: {
                programMembershipId: params.programMembershipId,
                offerIdentifier: params.offerIdentifier,
                sellerType: params.sellerType,
                sellerId: params.sellerId
            },
            expectedStatusCodes: [ACCEPTED]
        }).then(async (response) => response.json());
    }

    /**
     * 会員プログラム登録解除
     */
    public async unRegisterProgramMembership(params: {
        /**
         * 未指定の場合`me`がセットされます
         */
        id?: string;
        /**
         * 会員プログラム所有権識別子
         */
        ownershipInfoIdentifier: string;
    }): Promise<factory.task.ITask<factory.taskName.UnRegisterProgramMembership>> {
        const id = (params.id !== undefined) ? params.id : /* istanbul ignore next */  'me';

        return this.fetch({
            uri: `/people/${id}/ownershipInfos/programMembership/${params.ownershipInfoIdentifier}/unRegister`,
            method: 'PUT',
            body: {},
            expectedStatusCodes: [ACCEPTED]
        }).then(async (response) => response.json());
    }
}
