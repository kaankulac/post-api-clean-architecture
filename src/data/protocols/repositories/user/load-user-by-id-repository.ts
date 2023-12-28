export interface LoadUserByIdRepository {
    loadById: (data: LoadUserByIdRepository.Params) => Promise<LoadUserByIdRepository.Result>;
}

export namespace LoadUserByIdRepository {
    export type Params = string;

    export type Result = {
        id: string;
        username: string;
    };
}
