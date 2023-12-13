import env from '@main/config/env';
import { LoadUserByToken } from '@domain/usecases';
import { DbLoadUserByToken } from '@data/usecaes';
import { UserMongoRepository } from '@infrastructure/repositories';
import { JwtAdapter } from '@infrastructure/cryptography';

export const makeDbLoadUserByToken = (): LoadUserByToken => {
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const userMongoRepository = new UserMongoRepository();
    return new DbLoadUserByToken(userMongoRepository, jwtAdapter);
};
