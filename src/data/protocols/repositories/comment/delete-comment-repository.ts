import { DeleteComment } from '@domain/usecases';

export interface DeleteCommentRepository {
    delete: (commentId: DeleteCommentRepository.Params) => Promise<DeleteCommentRepository.Result>;
}

export namespace DeleteCommentRepository {
    export type Params = DeleteComment.Params;

    export type Result = boolean;
}
