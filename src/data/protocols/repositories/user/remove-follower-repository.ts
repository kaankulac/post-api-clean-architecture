export interface RemoveFollowerRepository {
    removeFollower: (data: RemoveFollowerRepository.Params) => Promise<RemoveFollowerRepository.Result>;
}

export namespace RemoveFollowerRepository {
    export type Params = {
        followedBy: string;
        followed: string;
    };

    export type Result = void;
}
