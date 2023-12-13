export interface LoadUserByTokenRepository {
    loadByToken: (data: LoadUserByTokenRepository.Params) => Promise<LoadUserByTokenRepository.Result>;
}

export namespace LoadUserByTokenRepository {
    export type Params = string;

    export type Result = {
        id: string;
    };
}
