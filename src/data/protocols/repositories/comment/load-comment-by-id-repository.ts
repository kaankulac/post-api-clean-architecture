import { CommentDocument } from '@domain/models';

export interface LoadCommentByIdRepository {
    loadById: (username: LoadCommentByIdRepository.Params) => Promise<LoadCommentByIdRepository.Result>;
}

export namespace LoadCommentByIdRepository {
    export type Params = string;

    export type Result = CommentDocument;
}
