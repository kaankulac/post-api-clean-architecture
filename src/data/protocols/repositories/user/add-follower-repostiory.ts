export interface AddFollowerRepository {
    addFollower: (data: AddFollowerRepository.Params) => Promise<AddFollowerRepository.Result>;
}

export namespace AddFollowerRepository {
    export type Params = {
        followedBy: string;
        followed: string;
    };

    export type Result = void;
}
