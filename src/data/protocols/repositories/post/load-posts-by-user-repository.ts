import { PostDocument } from '@domain/models';

export interface LoadPostsByUserRepository {
    loadByUser: (username: LoadPostsByUserRepository.Params) => Promise<LoadPostsByUserRepository.Result>;
}

export namespace LoadPostsByUserRepository {
    export type Params = string;

    export type Result = PostDocument[];
}
