import { PostDocument } from '@domain/models';

export interface EditPost {
    edit: (data: EditPost.Params) => Promise<EditPost.Result>;
}

export namespace EditPost {
    export type Params = {
        id: string;
        title: string;
        description: string;
    };

    export type Result = boolean;
}
