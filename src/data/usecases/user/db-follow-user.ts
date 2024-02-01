import { FollowUser } from '@domain/usecases';
import { LoadUserByIdRepository, FollowUserRepository, AddFollowerRepository } from '@data/protocols';

export class DbFollowUser implements FollowUser {
    constructor(
        private readonly loadById: LoadUserByIdRepository,
        private readonly followUser: FollowUserRepository,
        private readonly addFollower: AddFollowerRepository
    ) {}

    async follow(data: FollowUser.Params): Promise<FollowUser.Result> {
        const checkFollowed = await this.loadById.loadById(data.followed);
        if (checkFollowed) {
            await this.followUser.follow(data);
            await this.addFollower.addFollower(data);
            return true;
        }
        return false;
    }
}
