import env from '@main/config/env';
import { UserMongoRepository } from '@infrastructure/repositories';
import { BcryptAdapter, JwtAdapter } from '@infrastructure/cryptography';
import { DbAuthentication } from '@data/usecases';
import { Authentication } from '@domain/usecases';

export const makeDbAuthentication = (): Authentication => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const userMongoRepository = new UserMongoRepository();
    return new DbAuthentication(userMongoRepository, userMongoRepository, bcryptAdapter, jwtAdapter);
};
