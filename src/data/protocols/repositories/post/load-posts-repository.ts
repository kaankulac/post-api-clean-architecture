import { PostDocument } from '@domain/models';

export interface LoadPostRepository {
    loadPosts: (data: LoadPostRepository.Params) => Promise<LoadPostRepository.Result>;
}

export namespace LoadPostRepository {
    export type Params = {
        pagination: {
            per: number;
            page: number;
        };
    };

    export type Result = {
        posts: PostDocument[];
        totalCount: number;
    };
}
