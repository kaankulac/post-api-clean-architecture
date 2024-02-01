import { LoadPostsByUser } from '@domain/usecases';
import { LoadPostsByUserRepository, LoadUserByIdRepository } from '@data/protocols';

export class DbLoadPostsByUser implements LoadPostsByUser {
    constructor(
        private readonly loadPostsByUserRepository: LoadPostsByUserRepository,
        private readonly loadUserById: LoadUserByIdRepository
    ) {}

    async load(userId: LoadPostsByUser.Params): Promise<LoadPostsByUser.Result> {
        const exists = await this.loadUserById.loadById(userId);
        if (exists) {
            const result = this.loadPostsByUserRepository.loadByUser(userId);
            return result && result;
        }
        return null;
    }
}
