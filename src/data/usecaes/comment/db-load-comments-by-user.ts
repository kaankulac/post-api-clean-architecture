import { LoadCommentsByUser } from '@domain/usecases';
import { LoadCommentsByUserRepository } from '@data/protocols';

export class DbLoadCommentsByUser implements LoadCommentsByUser {
    constructor(private readonly loadCommentsByUserRepository: LoadCommentsByUserRepository) {}

    async load(userId: LoadCommentsByUser.Params): Promise<LoadCommentsByUser.Result> {
        const result = await this.loadCommentsByUserRepository.loadByUser(userId);
        return result && result;
    }
}
