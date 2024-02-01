import { DeletePost } from '@domain/usecases';
import { DeletePostRepository, LoadPostByIdRepository } from '@data/protocols';

export class DbDeletePost implements DeletePost {
    constructor(
        private readonly deletePostRepository: DeletePostRepository,
        private readonly loadPostById: LoadPostByIdRepository
    ) {}

    async delete(postId: DeletePost.Params): Promise<DeletePost.Result> {
        let isValid = false;
        const exists = await this.loadPostById.loadById(postId);
        if (exists) {
            isValid = await this.deletePostRepository.delete(postId);
        }
        return isValid;
    }
}
