import { CommentDocument } from '@domain/models';

export interface EditComment {
    edit: (data: EditComment.Params) => Promise<EditComment.Result>;
}

export namespace EditComment {
    export type Params = {
        commentId: string;
        comment: string;
    };

    export type Result = boolean;
}
