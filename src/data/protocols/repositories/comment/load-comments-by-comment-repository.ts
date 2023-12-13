import { CommentDocument } from '@domain/models';

export interface LoadCommentsByCommentRepository {
    loadByComment: (
        commentId: LoadCommentsByCommentRepository.Params
    ) => Promise<LoadCommentsByCommentRepository.Result>;
}

export namespace LoadCommentsByCommentRepository {
    export type Params = string;

    export type Result = CommentDocument[];
}
