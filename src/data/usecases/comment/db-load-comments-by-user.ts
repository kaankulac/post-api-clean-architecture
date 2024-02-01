import { LoadCommentsByUser } from '@domain/usecases';
import { LoadCommentsByUserRepository, LoadUserByIdRepository } from '@data/protocols';

export class DbLoadCommentsByUser implements LoadCommentsByUser {
    constructor(
        private readonly loadCommentsByUserRepository: LoadCommentsByUserRepository,
        private readonly loadUserById: LoadUserByIdRepository
    ) {}

    async load(userId: LoadCommentsByUser.Params): Promise<LoadCommentsByUser.Result> {
        const exists = await this.loadUserById.loadById(userId);
        if (exists) {
            const result = await this.loadCommentsByUserRepository.loadByUser(userId);
            return result && result;
        }
        return null;
    }
}
