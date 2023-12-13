export interface LoadUserByUsernameRepository {
    loadByUsername: (data: LoadUserByUsernameRepository.Params) => Promise<LoadUserByUsernameRepository.Result>;
}

export namespace LoadUserByUsernameRepository {
    export type Params = string;

    export type Result = {
        id: string;
        username: string;
        password: string;
    };
}
