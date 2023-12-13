export interface AnswerFollowRequest {
    answer: (data: AnswerFollowRequest.Params) => Promise<AnswerFollowRequest.Result>;
}

export namespace AnswerFollowRequest {
    export type Params = {
        from: string;
        user: string;
        answer: boolean;
    };

    export type Result = boolean;
}
