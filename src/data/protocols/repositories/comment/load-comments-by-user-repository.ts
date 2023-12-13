import { CommentDocument } from '@domain/models';

export interface LoadCommentsByUserRepository {
    loadByUser: (user: LoadCommentsByUserRepository.Params) => Promise<LoadCommentsByUserRepository.Result>;
}

export namespace LoadCommentsByUserRepository {
    export type Params = string;

    export type Result = CommentDocument[];
}
