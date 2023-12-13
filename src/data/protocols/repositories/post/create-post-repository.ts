import { CreatePost } from '@domain/usecases';

export interface CreatePostRepository {
    create: (data: CreatePostRepository.Params) => Promise<CreatePostRepository.Result>;
}

export namespace CreatePostRepository {
    export type Params = CreatePost.Params;

    export type Result = boolean;
}
