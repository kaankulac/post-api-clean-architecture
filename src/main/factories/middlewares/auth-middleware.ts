import { Middleware } from '@presentation/protocols';
import { AuthMiddleware } from '@presentation/middlewares';
import { makeDbLoadUserByToken } from '@main/factories';

export const makeAuthMiddleware = (): Middleware => {
    return new AuthMiddleware(makeDbLoadUserByToken());
};
