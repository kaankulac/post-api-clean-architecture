import { DeleteComment } from '@domain/usecases';
import { DeleteCommentRepository, LoadCommentByIdRepository } from '@data/protocols';

export class DbDeleteComment implements DeleteComment {
    constructor(
        private readonly deleteCommentRepository: DeleteCommentRepository,
        private readonly loadCommentByIdRepository: LoadCommentByIdRepository
    ) {}

    async delete(commentId: DeleteComment.Params): Promise<DeleteComment.Result> {
        let isValid = false;
        const exists = await this.loadCommentByIdRepository.loadById(commentId);
        if (exists) {
            isValid = await this.deleteCommentRepository.delete(commentId);
        }
        return isValid;
    }
}
