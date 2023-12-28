export interface FollowUserRepository {
    follow: (data: FollowUserRepository.Params) => Promise<void>;
}

export namespace FollowUserRepository {
    export type Params = {
        followedBy: string;
        followed: string;
    };

    export type Result = boolean;
}
