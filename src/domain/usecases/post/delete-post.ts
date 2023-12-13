export interface DeletePost {
    delete: (postId: DeletePost.Params) => Promise<DeletePost.Result>;
}

export namespace DeletePost {
    export type Params = string;

    export type Result = boolean;
}
