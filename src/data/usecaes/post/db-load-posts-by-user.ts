import { LoadPostsByUser } from '@domain/usecases';
import { LoadPostsByUserRepository } from '@data/protocols';

export class DbLoadPostsByUser implements LoadPostsByUser {
    constructor(private readonly loadPostsByUserRepository: LoadPostsByUserRepository) {}

    async load(username: LoadPostsByUser.Params): Promise<LoadPostsByUser.Result> {
        const result = this.loadPostsByUserRepository.loadByUser(username);
        return result && result;
    }
}
