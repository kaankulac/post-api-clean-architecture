import { LikeComment } from '@domain/usecases';
import { LikeCommentRepository, UnlikeCommentRepository } from '@data/protocols';

export class DbLikeComment implements LikeComment {
    constructor(
        private readonly likeCommentRepository: LikeCommentRepository,
        private readonly unlikeCommentRepostiroy: UnlikeCommentRepository
    ) {}

    async like(data: LikeComment.Params): Promise<LikeComment.Result> {
        let isValid = false;
        if (data.like) {
            isValid = await this.likeCommentRepository.likeComment({ comment: data.comment, user: data.user });
        } else {
            isValid = await this.unlikeCommentRepostiroy.unlikeComment({ comment: data.comment, user: data.user });
        }
        return isValid;
    }
}
