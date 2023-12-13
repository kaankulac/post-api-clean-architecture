export interface LikePostRepository {
    likePost: (data: LikePostRepository.Params) => Promise<LikePostRepository.Result>;
}

export namespace LikePostRepository {
    export type Params = {
        post: string;
        user: string;
    };

    export type Result = boolean;
}
