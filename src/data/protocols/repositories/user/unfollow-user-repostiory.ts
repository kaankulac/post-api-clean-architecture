export interface UnfollowUserRepository {
    unfollow: (data: UnfollowUserRepository.Params) => Promise<void>;
}

export namespace UnfollowUserRepository {
    export type Params = {
        followedBy: string;
        followed: string;
    };

    export type Result = boolean;
}
