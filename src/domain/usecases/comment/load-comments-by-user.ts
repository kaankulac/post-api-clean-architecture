import { CommentDocument } from '@domain/models';

export interface LoadCommentsByUser {
    load: (userId: string) => Promise<LoadCommentsByUser.Result>;
}

export namespace LoadCommentsByUser {
    export type Params = string;

    export type Result = CommentDocument[];
}
