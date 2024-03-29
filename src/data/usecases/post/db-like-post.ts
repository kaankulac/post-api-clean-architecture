import { LikePost } from '@domain/usecases';
import { LikePostRepository, LoadPostByIdRepository } from '@data/protocols';
import { UnlikePostRepository } from '@data/protocols';

export class DbLikePost implements LikePost {
    constructor(
        private readonly likePostRepsitory: LikePostRepository,
        private readonly unlikePostRepository: UnlikePostRepository,
        private readonly loadPostByIdRepository: LoadPostByIdRepository
    ) {}

    async like(data: LikePost.Params): Promise<LikePost.Result> {
        let isValid = false;
        const exists = await this.loadPostByIdRepository.loadById(data.post);
        if (exists) {
            if (data.like) {
                isValid = await this.likePostRepsitory.likePost({ post: data.post, user: data.user });
            } else {
                isValid = await this.unlikePostRepository.unlikePost({ post: data.post, user: data.user });
            }
        }
        return isValid;
    }
}
