export interface UnlikePostRepository {
    unlikePost: (data: UnlikePostRepository.Params) => Promise<UnlikePostRepository.Result>;
}

export namespace UnlikePostRepository {
    export type Params = {
        post: string;
        user: string;
    };

    export type Result = boolean;
}
