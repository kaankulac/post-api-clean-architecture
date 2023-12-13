export interface GetIdByUsernameRepository {
    getIdByUsername: (data: GetIdByUsernameRepository.Params) => Promise<GetIdByUsernameRepository.Result>;
}

export namespace GetIdByUsernameRepository {
    export type Params = string;
    export type Result = string | null;
}
