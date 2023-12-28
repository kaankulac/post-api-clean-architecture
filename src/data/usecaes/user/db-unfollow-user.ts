import { UnfollowUser } from '@domain/usecases';
import { LoadUserByIdRepository, UnfollowUserRepository } from '@data/protocols';

export class DbUnfollowUser implements UnfollowUser {
    constructor(
        private readonly loadById: LoadUserByIdRepository,
        private readonly unfollowUser: UnfollowUserRepository
    ) {}

    async unfollow(data: UnfollowUser.Params): Promise<boolean> {
        const checkFollowed = await this.loadById.loadById(data.followed);
        if (checkFollowed) {
            await this.unfollowUser.unfollow(data);
            return true;
        }
        return false;
    }
}
