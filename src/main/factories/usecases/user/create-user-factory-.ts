import { DbCreateUser } from '@data/usecases';
import { CreateUser } from '@domain/usecases';
import { UserMongoRepository } from '@infrastructure/repositories';
import { BcryptAdapter } from '@infrastructure/cryptography';

export const makeDbCreateUser = (): CreateUser => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const userMongoRepository = new UserMongoRepository();
    return new DbCreateUser(bcryptAdapter, userMongoRepository, userMongoRepository);
};
