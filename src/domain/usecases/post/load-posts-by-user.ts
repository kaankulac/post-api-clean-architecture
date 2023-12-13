import { PostDocument } from '@domain/models';

export interface LoadPostsByUser {
    load: (userId: string) => Promise<LoadPostsByUser.Result>;
}

export namespace LoadPostsByUser {
    export type Params = string;

    export type Result = PostDocument[];
}
