export interface FollowUserRepository {
    follow: (data: FollowUserRepository.Params) => Promise<FollowUserRepository.Result>;
}

export namespace FollowUserRepository {
    export type Params = {
        followedBy: string;
        followed: string;
    };

    export type Result = void;
}
