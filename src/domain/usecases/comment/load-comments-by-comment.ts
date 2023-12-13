import { CommentDocument } from '@domain/models';

export interface LoadCommentsByComment {
    load: (commentId: string) => Promise<LoadCommentsByComment.Result>;
}

export namespace LoadCommentsByComment {
    export type Params = string;

    export type Result = CommentDocument[];
}
