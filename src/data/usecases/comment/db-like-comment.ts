import { LikeComment } from '@domain/usecases';
import { LikeCommentRepository, LoadCommentByIdRepository, UnlikeCommentRepository } from '@data/protocols';

export class DbLikeComment implements LikeComment {
    constructor(
        private readonly likeCommentRepository: LikeCommentRepository,
        private readonly unlikeCommentRepostiroy: UnlikeCommentRepository,
        private readonly loadCommentByIdRepository: LoadCommentByIdRepository
    ) {}

    async like(data: LikeComment.Params): Promise<LikeComment.Result> {
        let isValid = false;
        const exists = await this.loadCommentByIdRepository.loadById(data.comment);
        if (exists) {
            if (data.like) {
                isValid = await this.likeCommentRepository.likeComment({ comment: data.comment, user: data.user });
            } else {
                isValid = await this.unlikeCommentRepostiroy.unlikeComment({ comment: data.comment, user: data.user });
            }
        }
        return isValid;
    }
}
