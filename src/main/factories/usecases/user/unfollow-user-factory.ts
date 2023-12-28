import { DbUnfollowUser } from '@data/usecaes';
import { UnfollowUser } from '@domain/usecases';
import { UserMongoRepository } from '@infrastructure/repositories';

export const makeDbUnfollowUser = (): UnfollowUser => {
    const userMongoRepository = new UserMongoRepository();
    return new DbUnfollowUser(userMongoRepository, userMongoRepository);
};
