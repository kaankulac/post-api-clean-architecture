export interface UnlikeCommentRepository {
    unlikeComment: (data: UnlikeCommentRepository.Params) => Promise<UnlikeCommentRepository.Result>;
}

export namespace UnlikeCommentRepository {
    export type Params = {
        comment: string;
        user: string;
    };

    export type Result = boolean;
}
