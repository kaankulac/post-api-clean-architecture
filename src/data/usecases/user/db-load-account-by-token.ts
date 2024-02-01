import { LoadUserByToken } from '@domain/usecases';
import { Decrypter, LoadUserByTokenRepository } from '@data/protocols';

export class DbLoadUserByToken implements LoadUserByToken {
    constructor(private readonly loadUserByToken: LoadUserByTokenRepository, private readonly decrypter: Decrypter) {}

    async load(accessToken: string): Promise<LoadUserByToken.Result> {
        let token: string;
        try {
            token = await this.decrypter.decrypt(accessToken);
        } catch (error) {
            return null;
        }
        if (token) {
            const user = await this.loadUserByToken.loadByToken(accessToken);
            if (user) return user;
        }
        return null;
    }
}
