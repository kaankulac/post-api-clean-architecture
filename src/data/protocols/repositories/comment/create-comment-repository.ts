import { CreateComment } from '@domain/usecases';

export interface CreateCommentRepository {
    create: (data: CreateCommentRepository.Params) => Promise<CreateCommentRepository.Result>;
}

export namespace CreateCommentRepository {
    export type Params = CreateComment.Params;

    export type Result = boolean;
}
