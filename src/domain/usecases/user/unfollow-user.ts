export interface UnfollowUser {
    unfollow: (data: UnfollowUser.Params) => Promise<UnfollowUser.Result>;
}

export namespace UnfollowUser {
    export type Params = {
        followedBy: string;
        followed: string;
    };

    export type Result = boolean;
}
