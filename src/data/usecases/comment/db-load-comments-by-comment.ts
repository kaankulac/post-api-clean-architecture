import { LoadCommentsByComment } from '@domain/usecases';
import { LoadCommentByIdRepository, LoadCommentsByCommentRepository } from '@data/protocols';

export class DbLoadCommentsByComment implements LoadCommentsByComment {
    constructor(
        private readonly loadCommentsByCommentRepository: LoadCommentsByCommentRepository,
        private readonly loadCommentByIdRepository: LoadCommentByIdRepository
    ) {}

    async load(commentId: LoadCommentsByComment.Params): Promise<LoadCommentsByComment.Result> {
        const exists = await this.loadCommentByIdRepository.loadById(commentId);
        if (exists) {
            const result = await this.loadCommentsByCommentRepository.loadByComment(commentId);
            return result && result;
        }
        return null;
    }
}
