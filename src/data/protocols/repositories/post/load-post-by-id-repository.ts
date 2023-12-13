import { PostDocument } from '@domain/models';

export interface LoadPostByIdRepository {
    loadById: (postId: LoadPostByIdRepository.Params) => Promise<LoadPostByIdRepository.Result>;
}

export namespace LoadPostByIdRepository {
    export type Params = string;

    export type Result = PostDocument;
}
