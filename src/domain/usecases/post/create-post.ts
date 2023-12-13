import { PostDocument } from '@domain/models';

export interface CreatePost {
    create: (data: CreatePost.Params) => Promise<CreatePost.Result>;
}

export namespace CreatePost {
    export type Params = {
        title: string;
        description: string;
        author: string;
    };

    export type Result = boolean;
}
