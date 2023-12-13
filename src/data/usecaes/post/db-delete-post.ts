import { DeletePost } from '@domain/usecases';
import { DeletePostRepository } from '@data/protocols';

export class DbDeletePost implements DeletePost {
    constructor(private readonly deletePostRepository: DeletePostRepository) {}

    async delete(postId: DeletePost.Params): Promise<DeletePost.Result> {
        const isValid = await this.deletePostRepository.delete(postId);
        return isValid;
    }
}
