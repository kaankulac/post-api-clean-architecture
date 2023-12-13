export interface SendFollowRequest {
    send: (data: SendFollowRequest.Params) => Promise<SendFollowRequest.Result>;
}

export namespace SendFollowRequest {
    export type Params = {
        from: string;
        to: string;
    };

    export type Result = boolean;
}
