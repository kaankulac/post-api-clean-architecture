import { UnfollowUser } from '@domain/usecases';
import { LoadUserByIdRepository, RemoveFollowerRepository, UnfollowUserRepository } from '@data/protocols';

export class DbUnfollowUser implements UnfollowUser {
    constructor(
        private readonly loadById: LoadUserByIdRepository,
        private readonly unfollowUser: UnfollowUserRepository,
        private readonly removeFollower: RemoveFollowerRepository
    ) {}

    async unfollow(data: UnfollowUser.Params): Promise<boolean> {
        const checkFollowed = await this.loadById.loadById(data.followed);
        if (checkFollowed) {
            await this.unfollowUser.unfollow(data);
            await this.removeFollower.removeFollower(data);
            return true;
        }
        return false;
    }
}
