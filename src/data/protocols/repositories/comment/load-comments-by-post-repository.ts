import { CommentDocument } from '@domain/models';

export interface LoadCommentsByPostRepository {
    loadByPost: (postId: LoadCommentsByPostRepository.Params) => Promise<LoadCommentsByPostRepository.Result>;
}

export namespace LoadCommentsByPostRepository {
    export type Params = string;

    export type Result = CommentDocument[];
}
