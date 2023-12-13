import { EditPost } from '@domain/usecases';

export interface EditPostRepository {
    edit: (data: EditPostRepository.Params) => Promise<EditPostRepository.Result>;
}

export namespace EditPostRepository {
    export type Params = EditPost.Params;

    export type Result = boolean;
}
