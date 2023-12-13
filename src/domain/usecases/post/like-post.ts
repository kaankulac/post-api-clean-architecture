export interface LikePost {
    like: (data: LikePost.Params) => Promise<LikePost.Result>;
}

export namespace LikePost {
    export type Params = {
        post: string;
        user: string;
        like: boolean;
    };

    export type Result = boolean;
}
