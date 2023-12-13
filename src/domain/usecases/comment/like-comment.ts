export interface LikeComment {
    like: (data: LikeComment.Params) => Promise<LikeComment.Result>;
}

export namespace LikeComment {
    export type Params = {
        comment: string;
        user: string;
        like: boolean;
    };

    export type Result = boolean;
}
