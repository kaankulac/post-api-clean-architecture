import { DeleteComment } from '@domain/usecases';
import { DeleteCommentRepository } from '@data/protocols';

export class DbDeleteComment implements DeleteComment {
    constructor(private readonly deleteCommentRepository: DeleteCommentRepository) {}

    async delete(commentId: DeleteComment.Params): Promise<DeleteComment.Result> {
        let isValid = false;
        isValid = await this.deleteCommentRepository.delete(commentId);
        return isValid;
    }
}
