import { CommentDocument } from '@domain/models';

export interface LoadCommentByIdRepository {
    loadById: (id: LoadCommentByIdRepository.Params) => Promise<LoadCommentByIdRepository.Result>;
}

export namespace LoadCommentByIdRepository {
    export type Params = string;

    export type Result = CommentDocument;
}
