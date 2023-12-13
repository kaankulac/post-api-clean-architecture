import { CommentDocument } from '@domain/models';

export interface CreateComment {
    create: (data: CreateComment.Params) => Promise<CreateComment.Result>;
}

export namespace CreateComment {
    export type Params = Omit<
        CommentDocument,
        'createdAt' | 'updatedAt' | 'likes' | 'comments' | 'totalLikes' | 'totalComments'
    >;

    export type Result = boolean;
}
