import { CommentDocument } from '@domain/models';
import { Types } from 'mongoose';

export interface EditComment {
    edit: (data: EditComment.Params) => Promise<EditComment.Result>;
}

export namespace EditComment {
    export type Params = {
        commentId: Types.ObjectId | string;
        comment: string;
    };

    export type Result = boolean;
}
