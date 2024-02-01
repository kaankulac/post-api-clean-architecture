import { LoadCommentsByPost } from '@domain/usecases';
import { LoadCommentsByPostRepository, LoadPostByIdRepository } from '@data/protocols';

export class DbLoadCommentByPost implements LoadCommentsByPost {
    constructor(
        private readonly loadCommentsByPostRepositroy: LoadCommentsByPostRepository,
        private readonly loadPostByIdRepository: LoadPostByIdRepository
    ) {}

    async load(postId: LoadCommentsByPost.Params): Promise<LoadCommentsByPost.Result> {
        const exists = await this.loadPostByIdRepository.loadById(postId);
        if (exists) {
            const result = await this.loadCommentsByPostRepositroy.loadByPost(postId);
            return result && result;
        }
        return null;
    }
}
