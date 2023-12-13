import { LoadCommentsByComment } from '@domain/usecases';
import { LoadCommentsByCommentRepository } from '@data/protocols';

export class DbLoadCommentsByComment implements LoadCommentsByComment {
    constructor(private readonly loadCommentsByCommentRepository: LoadCommentsByCommentRepository) {}

    async load(commentId: LoadCommentsByComment.Params): Promise<LoadCommentsByComment.Result> {
        const result = await this.loadCommentsByCommentRepository.loadByComment(commentId);
        return result && result;
    }
}
