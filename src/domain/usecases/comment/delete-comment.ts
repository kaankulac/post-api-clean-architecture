export interface DeleteComment {
    delete: (commentId: DeleteComment.Params) => Promise<DeleteComment.Result>;
}

export namespace DeleteComment {
    export type Params = string;

    export type Result = boolean;
}
