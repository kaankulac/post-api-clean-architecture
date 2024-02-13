import { LoadPosts } from '@domain/usecases';
import { LoadPostRepository } from '@data/protocols';

export class DbLoadPosts implements LoadPosts {
    constructor(private readonly loadPostsRepository: LoadPostRepository) {}

    async loadPosts(data: LoadPosts.Params): Promise<LoadPosts.Result> {
        const pagination = {
            per: data.per,
            page: data.page
        };
        const result = await this.loadPostsRepository.loadPosts({ pagination });
        return result;
    }
}
