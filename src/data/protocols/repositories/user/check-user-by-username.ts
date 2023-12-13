export interface CheckUserByUsernameRepository {
    checkByUserName: (data: CheckUserByUsernameRepository.Params) => Promise<CheckUserByUsernameRepository.Result>;
}

export namespace CheckUserByUsernameRepository {
    export type Params = string;
    export type Result = boolean;
}
