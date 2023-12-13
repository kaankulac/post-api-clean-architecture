export interface LikeCommentRepository {
    likeComment: (data: LikeCommentRepository.Params) => Promise<LikeCommentRepository.Result>;
}

export namespace LikeCommentRepository {
    export type Params = {
        comment: string;
        user: string;
    };

    export type Result = boolean;
}
