import { DbFollowUser } from '@data/usecaes';
import { FollowUser } from '@domain/usecases';
import { UserMongoRepository } from '@infrastructure/repositories';

export const makeDbFollowUser = (): FollowUser => {
    const userMongoRepository = new UserMongoRepository();
    return new DbFollowUser(userMongoRepository, userMongoRepository);
};
