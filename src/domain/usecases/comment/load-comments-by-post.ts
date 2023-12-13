import { CommentDocument } from '@domain/models';

export interface LoadCommentsByPost {
    load: (postId: string) => Promise<LoadCommentsByPost.Result>;
}

export namespace LoadCommentsByPost {
    export type Params = string;

    export type Result = CommentDocument[];
}
