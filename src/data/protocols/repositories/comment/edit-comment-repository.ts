import { EditComment } from '@domain/usecases';

export interface EditCommentRepository {
    edit: (data: EditCommentRepository.Params) => Promise<EditCommentRepository.Result>;
}

export namespace EditCommentRepository {
    export type Params = EditComment.Params;

    export type Result = boolean;
}
