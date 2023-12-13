import { DeletePost } from '@domain/usecases';

export interface DeletePostRepository {
    delete: (postId: DeletePostRepository.Params) => Promise<DeletePostRepository.Result>;
}

export namespace DeletePostRepository {
    export type Params = DeletePost.Params;

    export type Result = boolean;
}
