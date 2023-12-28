export interface FollowUser {
    follow: (data: FollowUser.Params) => Promise<FollowUser.Result>;
}

export namespace FollowUser {
    export type Params = {
        followedBy: string;
        followed: string;
    };

    export type Result = boolean;
}
