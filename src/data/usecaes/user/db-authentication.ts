import { Authentication } from '@domain/usecases';
import { HashComparer, Encrypter, LoadUserByUsernameRepository, UpdateAccessTokenRepository } from '@data/protocols';

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadAccountByUsername: LoadUserByUsernameRepository,
        private readonly updateAccessToken: UpdateAccessTokenRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter
    ) {}

    async auth(authenticationParams: Authentication.Params): Promise<Authentication.Result> {
        const user = await this.loadAccountByUsername.loadByUsername(authenticationParams.username);
        if (user) {
            const isValid = await this.hashComparer.compare(authenticationParams.password, user.password);
            if (isValid) {
                const accessToken = await this.encrypter.encrypt(user.id);
                await this.updateAccessToken.updateAccessToken({ id: user.id, token: accessToken });
                return {
                    accessToken,
                    username: user.username
                };
            }
        }
        return null;
    }
}
