import { LoadCommentsByPost } from '@domain/usecases';
import { LoadCommentsByPostRepository } from '@data/protocols';

export class DbLoadCommentByPost implements LoadCommentsByPost {
    constructor(private readonly loadCommentsByPostRepostiroy: LoadCommentsByPostRepository) {}

    async load(postId: LoadCommentsByPost.Params): Promise<LoadCommentsByPost.Result> {
        const result = await this.loadCommentsByPostRepostiroy.loadByPost(postId);
        return result && result;
    }
}
