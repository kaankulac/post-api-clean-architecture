import { PostDocument } from '@domain/models';

export interface LoadPosts {
    loadPosts: (data: LoadPosts.Params) => Promise<LoadPosts.Result>;
}

export namespace LoadPosts {
    export type Params = {
        per: number;
        page: number;
    };

    export type Result = {
        posts: PostDocument[];
        totalCount: number;
    };
}
